import { Schema, Types, model } from "mongoose";

export type IChat = {
  users: Types.ObjectId[];
  latestMessage?: Types.ObjectId;
};

const chatSchema = new Schema<IChat>(
  {
    users: [{ required: true, ref: "User", type: Schema.Types.ObjectId }],
    latestMessage: { ref: "Message", type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
