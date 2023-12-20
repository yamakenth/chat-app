import "colors.ts";
import cors from "cors";
import express, { Request, Response } from "express";
import { connectDB } from "./config";
import { PORT as PORT_FROM_ENV } from "./environment";
import { auth, errorHandler, routeNotFound } from "./middleware";
import { chatRoutes, messageRoutes, userRoutes } from "./routes";

const PORT = PORT_FROM_ENV || 8080;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chats", auth, chatRoutes);
app.use("/api/messages", auth, messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Successfully connected to Chat App server");
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`.cyan.underline);
});
