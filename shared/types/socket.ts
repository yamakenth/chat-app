import { Message } from "./serverResBody";

export type WsClientToServerEvents = {
  setup: (userId: string) => void;
  joinChat: (chatId: string) => void;
  newMessage: (newMessageReceived: Message) => void;
};

export type WsServerToClientEvents = {
  connected: () => void;
  messageReceived: (message: Message) => void;
};
