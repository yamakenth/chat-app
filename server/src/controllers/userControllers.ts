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

  const users = await User.find(filter, { _id: 1, email: 1, name: 1 });
  res.json(users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("userId is required");
  }

  const user = await User.findById(userId, { _id: 1, email: 1, name: 1 });
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export const createUser = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    const { email, name, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await User.create({ email, name, password });
    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        token: generateToken(newUser.id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email not found");
  }

  const matchesStoredPassword = await user.matchesStoredPassword(password);
  if (matchesStoredPassword) {
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to login the user");
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("userId is required");
  }

  const loggedInUserId = req.user.id;
  if (userId !== loggedInUserId) {
    res.status(401);
    throw new Error("You are not authorized to delete the user");
  }

  const deletedUser = await User.findOneAndDelete({ _id: userId });
  if (deletedUser) {
    res.json({
      id: deletedUser.id,
      email: deletedUser.email,
      name: deletedUser.name,
    });
  } else {
    res.status(400);
    throw new Error("Failed to delete the user");
  }
});
