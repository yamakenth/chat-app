import { Chat, Message, User } from "@types";

export const EMPTY_CHAT: Chat = {
  _id: undefined,
  users: undefined,
  latestMessage: undefined,
};

export const EMPTY_MESSAGE: Message = {
  _id: undefined,
  chat: undefined,
  content: undefined,
  sender: undefined,
  createdAt: undefined,
};

export const EMPTY_USER: User = {
  _id: undefined,
  email: undefined,
  name: undefined,
  isChatbot: undefined,
  token: undefined,
};
