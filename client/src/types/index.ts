export interface User {
  _id?: string;
  email?: string;
  name?: string;
  isChatbot?: boolean;
  token?: string;
}

export const EMPTY_USER: User = {
  _id: undefined,
  email: undefined,
  name: undefined,
  isChatbot: undefined,
  token: undefined,
};

export interface Message {
  _id?: string;
  chat?: string;
  content?: string;
  sender?: User;
}

export const EMPTY_MESSAGE: Message = {
  _id: undefined,
  chat: undefined,
  content: undefined,
  sender: undefined,
};

export interface Chat {
  _id?: string;
  users?: User[];
  latestMessage?: Message;
}

export const EMPTY_CHAT: Chat = {
  _id: undefined,
  users: undefined,
  latestMessage: undefined,
};
