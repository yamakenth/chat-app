import { createHeaders } from "./utils";

const sendMessage = async (
  chatId?: string,
  content?: string,
  userToken?: string
) => {
  if (!chatId || !content) {
    throw new Error("chatId and content required");
  } else if (!userToken) {
    throw new Error("Failed to extract User ID or User Token");
  }

  const headers = createHeaders(userToken);
  const body = JSON.stringify({ chatId, content });

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers,
      body,
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default sendMessage;
