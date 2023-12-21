import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../environment";

const DEFAULT_JWT_EXPIRY = "3d";

export const generateToken = (id: string, isChatbot: boolean) => {
  const options = isChatbot ? {} : { expiresIn: DEFAULT_JWT_EXPIRY };
  return jwt.sign({ id }, JWT_SECRET, options);
};
