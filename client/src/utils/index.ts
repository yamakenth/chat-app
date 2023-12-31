import { Chat } from "@types";

export const isEmptyObject = (obj: {}) => {
  return Object.keys(obj).length === 0;
};

export const sortChatListByMostRecent = (chats: Chat[]) => {
  chats.sort((a, b) => {
    const aCreatedAt = new Date(a.latestMessage?.createdAt || 0).getTime();
    const bCreatedAt = new Date(b.latestMessage?.createdAt || 0).getTime();
    return bCreatedAt - aCreatedAt;
  });
};

export const formattedLatestMessageContent = (content: string) => {
  if (content.length <= 50) {
    return content;
  }
  return content.substring(0, 51) + "...";
};
