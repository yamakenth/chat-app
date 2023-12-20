import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getChatList = asyncHandler(
  async (_req: Request, res: Response) => {
    // TODO
    res.send("to implement getChatList");
  }
);

export const getChat = asyncHandler(async (_req: Request, res: Response) => {
  // TODO
  res.send("to implement getChat");
});

export const createChat = asyncHandler(async (_req: Request, res: Response) => {
  // TODO
  res.send("to implement createChat");
});

export const deleteChat = asyncHandler(async (_req: Request, res: Response) => {
  // TODO
  res.send("to implement deleteChat");
});
