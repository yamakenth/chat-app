import bcrypt from "bcryptjs";
import { CallbackWithoutResultAndOptionalError, Schema, model } from "mongoose";

export type IUser = {
  email: string;
  name: string;
  password: string;
  isChatbot?: boolean | "true" | "false";
  matchesStoredPassword: (enteredPassword: string) => Promise<boolean>;
};

const userSchema = new Schema<IUser>(
  {
    email: { required: true, type: String, unique: true },
    name: { required: true, type: String },
    password: { required: true, type: String },
    isChatbot: { type: String, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchesStoredPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
);

const User = model<IUser>("User", userSchema);

export default User;
