import mongoose from "mongoose";
import { MONGO_URI } from "../environment";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.green);
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`.red.bold);
    process.exit();
  }
};
