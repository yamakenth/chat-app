import {
  CallbackWithoutResultAndOptionalError,
  Schema,
  Types,
  model,
} from "mongoose";

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

chatSchema
  .pre("save", function (next: CallbackWithoutResultAndOptionalError) {
    this.populate("users", "email name isChatbot");
    next();
  })
  .pre("find", function (next: CallbackWithoutResultAndOptionalError) {
    this.populate("users", "email name isChatbot").populate(
      "latestMessage",
      "content sender createdAt"
    );
    next();
  })
  .pre("findOne", function (next: CallbackWithoutResultAndOptionalError) {
    this.populate("users", "email name isChatbot").populate(
      "latestMessage",
      "content sender createdAt"
    );
    next();
  });

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
