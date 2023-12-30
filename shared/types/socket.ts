import { Message } from "./serverResBody";

export type WsClientToServerEvents = {
  setup: (userId: string) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  newMessage: (newMessageReceived: Message) => void;
  typing: (chatId: string) => void;
  stoppedTyping: (chatId: string) => void;
};

export type WsServerToClientEvents = {
  connected: () => void;
  messageReceived: (message: Message) => void;
  typing: () => void;
  stoppedTyping: () => void;
};
