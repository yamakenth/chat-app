import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Chat, Message } from "../models";

export const getChatList = asyncHandler(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;

  try {
    const chats = await Chat.find({
      $and: [{ users: { $elemMatch: { $eq: loggedInUserId } } }],
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});

export const getChat = asyncHandler(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;

  const { chatId } = req.params;
  if (!chatId) {
    res.status(400);
    throw new Error("chatId not provided with request");
  }

  try {
    const chat = await Chat.findOne({ _id: chatId });
    const isLoggedInUserMember = chat?.users
      .map((user) => user._id.toString())
      .includes(loggedInUserId);
    if (!isLoggedInUserMember) {
      res.status(401);
      throw new Error("Unauthorized to access chat");
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const creatorId = req.user.id;

  const { memberId } = req.body;
  if (!memberId) {
    res.status(400);
    throw new Error("memberId not provided with request");
  }

  try {
    const existingChat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: creatorId } } },
        { users: { $elemMatch: { $eq: memberId } } },
      ],
    });
    if (existingChat) {
      res.status(200).json(existingChat);
      return;
    }

    const newChat = await Chat.create({ users: [creatorId, memberId] });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});

export const deleteChat = asyncHandler(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;

  const { chatId } = req.params;
  if (!chatId) {
    res.status(400);
    throw new Error("chatId not provided with request");
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(400);
      throw new Error("Chat not found");
    }

    const isCreatorsChat = chat?.users
      .map((objectId) => objectId.id)
      .includes(loggedInUserId);
    if (!isCreatorsChat) {
      res.status(401);
      throw new Error("Unauthorized to delete chat");
    }

    await Message.deleteMany({ chat: chatId });

    const deletedChat = await Chat.findOneAndDelete({ _id: chatId });
    res.status(200).json(deletedChat);
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});
