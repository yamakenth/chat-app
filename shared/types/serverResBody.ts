export type Chat = {
  _id?: string;
  users?: User[];
  latestMessage?: Message;
};

export type Message = {
  _id?: string;
  chat?: Chat;
  content?: string;
  sender?: User;
  createdAt?: string;
};

export type User = {
  _id?: string;
  email?: string;
  name?: string;
  isChatbot?: boolean | "true" | "false";
  token?: string;
};
