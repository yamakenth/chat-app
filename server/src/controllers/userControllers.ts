import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateToken } from "../config";
import { IUser, User } from "../models";

export const getUserList = asyncHandler(
  async (_req: Request, res: Response) => {
    // TODO
    res.send("getUserList to be implemented");
  }
);

export const getUser = asyncHandler(async (_req: Request, res: Response) => {
  // TODO
  res.send("getUser to be implemented");
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

export const loginUser = asyncHandler(async (_req: Request, res: Response) => {
  // TODO
  res.send("loginUser to be implemented");
});

export const updateUser = asyncHandler(async (_req: Request, res: Response) => {
  // TODO
  res.send("updateUser to be implemented");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("userId is required");
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
