import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getMessageList = asyncHandler(
  async (_req: Request, res: Response) => {
    res.send("getMessageList to be implemented");
  }
);

export const createMessage = asyncHandler(
  async (_req: Request, res: Response) => {
    res.send("createMessage to be implemented");
  }
);
