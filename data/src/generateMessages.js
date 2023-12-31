const colors = require("colors");
const fs = require("fs");
const ProgressBar = require("progress");
const { OPENAI_API_KEY } = require("./environment");

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = "gpt-3.5-turbo-1106";
const DEFAULT_OPENAI_TEMPERATURE = 0.7;

/**
 * @typedef {Object} Message
 * @property {string} sender
 * @property {string} receiver
 * @property {string} content
 */

/**
 * @param {string} messagesFname
 * @param {string} chatsFname
 */
const generateMessages = async (messagesFname, chatsFname) => {
  /**
   * @type {Object.<string, string[]>}
   */
  const chats = JSON.parse(fs.readFileSync(chatsFname, "utf8"));

  const bar = new ProgressBar("[:bar] :current/:total".cyan, {
    complete: "*",
    total: Object.keys(chats).length,
  });

  /**
   * @type {{conversation: Message[]}[]}
   */
  const messages = [];
  for (const [sender, receivers] of Object.entries(chats)) {
    for (const receiver of receivers) {
      try {
        const gptPrompt = [
          {
            role: "user",
            content:
              `I have person "${sender}" and "${receiver}".` +
              " Create a conversation between these two people and return as the results" +
              " an array in the form of [sender, receiver, message]." +
              " Return these result in JSON format of" +
              ' {"conversation": {sender: string, receiver: string, content: string}[]}[].',
          },
        ];
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        };
        const body = {
          model: DEFAULT_OPENAI_MODEL,
          messages: gptPrompt,
          temperature: DEFAULT_OPENAI_TEMPERATURE,
          response_format: { type: "json_object" },
        };
        const res = await fetch(OPENAI_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(body),
          headers,
        });
        const data = await res.json();
        if (res.ok) {
          const content = data.choices[0].message.content;
          const jsonContent = JSON.parse(content);
          messages.push(jsonContent);
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
    bar.tick();
    if (bar.complete) {
      console.log("message generation complete".cyan);
    }
  }

  fs.writeFileSync(messagesFname, JSON.stringify(messages));
  console.log(`successfully created ${messagesFname}`.green);
};

module.exports = generateMessages;
