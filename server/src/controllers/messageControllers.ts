import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Chat, Message } from "../models";

export const getMessageList = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatId } = req.params;
    if (!chatId) {
      res.status(400);
      throw new Error("chatId is required");
    }

    try {
      const messages = await Message.find({ chat: chatId })
        .populate("sender", "name")
        .populate("chat");
      res.json(messages);
    } catch {
      res.status(400);
      throw new Error("Failed to get message list");
    }
  }
);

export const createMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUserId = req.user.id;

    const { chatId, content } = req.body;
    if (!chatId || !content) {
      res.status(400);
      throw new Error("chatId and content are required");
    }

    try {
      const newMessage = await Message.create({
        chat: chatId,
        content,
        sender: loggedInUserId,
      });
      await newMessage.populate("sender", "name");
      await newMessage.populate("chat");
      await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });
      res.json(newMessage);
    } catch {
      res.status(400);
      throw new Error("Failed to create the message");
    }
  }
);
