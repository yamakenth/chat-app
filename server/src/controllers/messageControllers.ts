import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Chat, Message } from "../models";

export const getMessageList = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatId } = req.params;
    if (!chatId) {
      res.status(400);
      throw new Error("chatId not provided with request");
    }

    try {
      const messages = await Message.find({ chat: chatId });
      res.status(200).json(messages);
    } catch (error) {
      res.status(400);
      throw new Error((error as Error).message);
    }
  }
);

export const createMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUserId = req.user.id;

    const { chatId, content } = req.body;
    if (!chatId || !content) {
      res.status(400);
      throw new Error("chatId, content not provided with request");
    }

    try {
      const newMessage = await Message.create({
        chat: chatId,
        content,
        sender: loggedInUserId,
      });
      await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(400);
      throw new Error((error as Error).message);
    }
  }
);
