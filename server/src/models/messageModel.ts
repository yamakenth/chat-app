import { Schema, Types, model } from "mongoose";

export type IMessage = {
  chat: Types.ObjectId;
  content: string;
  sender: Types.ObjectId;
};

const messageSchema = new Schema<IMessage>(
  {
    chat: { required: true, ref: "Chat", type: Schema.Types.ObjectId },
    content: { required: true, trim: true, type: String },
    sender: { required: true, ref: "User", type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Message = model<IMessage>("Message", messageSchema);

export default Message;
