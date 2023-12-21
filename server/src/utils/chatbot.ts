import { OPENAI_API_KEY } from "../environment";
import { Chat, IMessage, IUser, Message, User } from "../models";

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = "gpt-3.5-turbo";
const DEFAULT_OPENAI_TEMPERATURE = 0.7;

export const generateChatbotMessage = async (chatId: string) => {
  try {
    const messages = await Message.find({ chat: chatId });
    const mappedMessages = mapMessagesForChatGpt(messages);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };
    const body = {
      model: DEFAULT_OPENAI_MODEL,
      messages: mappedMessages,
      temperature: DEFAULT_OPENAI_TEMPERATURE,
    };

    const res = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const data = await res.json();

    if (res.ok) {
      const content = data.choices[0].message.content;
      if (!content) {
        throw new Error("No response returned");
      }

      const chatbot = await User.findOne({ isChatbot: "true" }, { _id: 1 });
      if (!chatbot) {
        throw new Error("Chatbot not found");
      }

      const newMessage = await Message.create({
        chat: chatId,
        content,
        sender: chatbot.id,
      });
      await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

      return newMessage;
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const mapMessagesForChatGpt = (messages: IMessage[]) => {
  const mappedMessages = messages.map((msg) => {
    const isChatbot =
      (msg as IMessage & { sender: IUser }).sender.isChatbot === "true";
    return {
      role: isChatbot ? "assistant" : "user",
      content: msg.content,
    };
  });
  return mappedMessages;
};
