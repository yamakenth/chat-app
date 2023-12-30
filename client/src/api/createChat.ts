import { createHeaders } from "./utils";

const createChat = async (userId?: string, userToken?: string) => {
  if (!userId) {
    throw new Error("userId required");
  } else if (!userToken) {
    throw new Error("Failed to extract User Token");
  }

  const headers = createHeaders(userToken);
  const body = { memberId: userId };

  try {
    const response = await fetch("/api/chats/", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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

export default createChat;
