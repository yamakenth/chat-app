import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../environment";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack: NODE_ENV === "production" ? null : error.stack,
  });
};
