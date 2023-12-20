import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../environment";
import { User } from "../models";

interface JwtPayloadWithUserId extends JwtPayload {
  id: string;
}

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const isValidAuthHeader = authHeader && authHeader.startsWith("Bearer");
    if (!isValidAuthHeader) {
      res.status(401);
      throw new Error("Authentication header is not valid");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized, auth token is not found");
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithUserId;
      const loggedInUser = await User.findById(decoded.id);
      if (!loggedInUser) {
        throw new Error();
      }
      req.user = loggedInUser;
      next();
    } catch {
      res.status(401);
      throw new Error("Unauthorized, auth token is not valid");
    }
  }
);
