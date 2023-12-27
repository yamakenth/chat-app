import { createHeaders } from "./utils";

const getMessageList = async (chatId?: string, userToken?: string) => {
  if (!chatId) {
    throw new Error("ChatId required");
  } else if (!userToken) {
    throw new Error("Failed to extract User Token");
  }

  const headers = createHeaders(userToken);

  try {
    const response = await fetch(`/api/messages/${chatId}`, {
      method: "GET",
      headers,
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

export default getMessageList;
