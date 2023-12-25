import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { FilterQuery } from "mongoose";
import { generateToken } from "../config";
import { IUser, User } from "../models";

export const getUserList = asyncHandler(async (req: Request, res: Response) => {
  const { nameOrEmail } = req.query;

  let filter: FilterQuery<IUser> = {};
  if (nameOrEmail) {
    filter = {
      $or: [
        { name: { $regex: nameOrEmail, $options: "i" } },
        { email: { $regex: nameOrEmail, $options: "i" } },
      ],
    };
  }

  try {
    const users = await User.find(filter, { _id: 1, email: 1, name: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("userId not provided with request");
  }

  try {
    const user = await User.findById(userId, { _id: 1, email: 1, name: 1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});

export const createUser = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    const { email, name, password, isChatbot = false } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email, password not provided with request");
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
      }

      const newUser = await User.create({ email, name, password, isChatbot });
      res.status(201).json({
        _id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isChatbot: newUser.isChatbot,
        token: generateToken(newUser.id, isChatbot as boolean),
      });
    } catch (error) {
      res.status(400);
      throw new Error((error as Error).message);
    }
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, isChatbot = false } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email, password not provided with request");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Email not found");
    }

    const matchesStoredPassword = await user.matchesStoredPassword(password);
    if (!matchesStoredPassword) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    res.status(200).json({
      _id: user.id,
      email: user.email,
      name: user.name,
      isChatbot: user.isChatbot,
      token: generateToken(user.id, isChatbot),
    });
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("userId not provided with request");
  }

  const loggedInUserId = req.user.id;
  if (userId !== loggedInUserId) {
    res.status(401);
    throw new Error("Unauthorized to delete user");
  }

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({
        _id: deletedUser.id,
        email: deletedUser.email,
        name: deletedUser.name,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error((error as Error).message);
  }
});
