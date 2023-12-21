import {
  CallbackWithoutResultAndOptionalError,
  Schema,
  Types,
  model,
} from "mongoose";

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

messageSchema
  .pre("save", function (next: CallbackWithoutResultAndOptionalError) {
    this.populate("sender", "email name isChatbot");
    next();
  })
  .pre("find", function (next: CallbackWithoutResultAndOptionalError) {
    this.populate("sender", "email name isChatbot");
    next();
  });

const Message = model<IMessage>("Message", messageSchema);

export default Message;
