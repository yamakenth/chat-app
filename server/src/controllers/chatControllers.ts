import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Chat } from "../models";

export const getChatList = asyncHandler(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;

  const chats = await Chat.find({
    $and: [{ users: { $elemMatch: { $eq: loggedInUserId } } }],
  }).populate("users", "email name");

  res.json(chats);
});

export const getChat = asyncHandler(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;

  const { chatId } = req.params;
  if (!chatId) {
    res.status(400);
    throw new Error("chatId is required");
  }

  const chat = await Chat.findById(chatId).populate("users", "email name");
  const isLoggedInUserMember = chat?.users
    .map((user) => user._id.toString())
    .includes(loggedInUserId);
  if (!isLoggedInUserMember) {
    res.status(401);
    throw new Error("You are not authorized to access the chat");
  }

  if (chat) {
    res.json(chat);
  } else {
    res.status(400);
    throw new Error("Chat not found");
  }
});

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const creatorId = req.user.id;

  const { memberId } = req.body;
  if (!memberId) {
    res.status(400);
    throw new Error("memberId is required");
  }

  const existingChat = await Chat.findOne({
    $and: [
      { users: { $elemMatch: { $eq: creatorId } } },
      { users: { $elemMatch: { $eq: memberId } } },
    ],
  }).populate("users", "email name");
  if (existingChat) {
    res.json(existingChat);
    return;
  }

  const newChat = await Chat.create({ users: [creatorId, memberId] });
  const fullNewChat = await Chat.findById(newChat._id).populate(
    "users",
    "email name"
  );

  if (fullNewChat) {
    res.status(201).json(fullNewChat);
  } else {
    res.status(400);
    throw new Error("Failed to create the chat");
  }
});

export const deleteChat = asyncHandler(async (req: Request, res: Response) => {
  const loggedInUserId = req.user.id;

  const { chatId } = req.params;
  if (!chatId) {
    res.status(400);
    throw new Error("chatId is required");
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    res.status(400);
    throw new Error("Chat not found");
  }

  const isCreatorsChat = chat?.users
    .map((objectId) => objectId.toString())
    .includes(loggedInUserId);
  if (!isCreatorsChat) {
    res.status(401);
    throw new Error("You are not authorized to delete the chat");
  }

  const deletedChat = await Chat.findOneAndDelete({ _id: chatId });
  if (deletedChat) {
    res.json(deletedChat);
  } else {
    res.status(400);
    throw new Error("Failed to delete the chat");
  }
});
