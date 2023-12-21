import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const PORT = process.env.PORT as string;
export const MONGO_URI = process.env.MONGO_URI as string;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const NODE_ENV = process.env.NODE_ENV as "development" | "production";
