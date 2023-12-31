import { WsClientToServerEvents, WsServerToClientEvents } from "@types";
import "colors.ts";
import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import { Server } from "socket.io";
import { connectDB } from "./config";
import { NODE_ENV, PORT as PORT_FROM_ENV } from "./environment";
import { auth, errorHandler, routeNotFound } from "./middleware";
import { chatRoutes, messageRoutes, userRoutes } from "./routes";
import { EMPTY_CHAT } from "./constants";

const CLIENT_ENDPOINT = "http://localhost:3000";
const PORT = PORT_FROM_ENV || 8080;
const SOCKET_TIMEOUT_IN_MS = 60_000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chats", auth, chatRoutes);
app.use("/api/messages", auth, messageRoutes);
app.use("/api/users", userRoutes);

app.get("/api", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Successfully connected to Chat App server" });
});

if (NODE_ENV === "production") {
  const __dirname1 = path.resolve();
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (_req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (_req: Request, res: Response) => {
    res.send({ message: "Welcome to Underground Foodies" });
  });
}

app.use(routeNotFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`.cyan.underline);
});

const io = new Server<WsClientToServerEvents, WsServerToClientEvents>(server, {
  pingTimeout: SOCKET_TIMEOUT_IN_MS,
  cors: { origin: CLIENT_ENDPOINT },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io".yellow);

  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.emit("connected");
  });

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`user joined room: ${chatId}`);
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`user left room: ${chatId}`);
  });

  socket.on("typing", (chatId) => socket.in(chatId).emit("typing"));

  socket.on("stoppedTyping", (chatId) =>
    socket.in(chatId).emit("stoppedTyping")
  );

  socket.on("newMessage", (newMessageReceived) => {
    const chat = newMessageReceived.chat || EMPTY_CHAT;
    if (!chat.users) {
      return;
    }
    chat.users.forEach((user) => {
      if (!user._id || user._id === newMessageReceived.sender?._id) {
        return;
      }
      socket.in(user._id).emit("messageReceived", newMessageReceived);
    });
  });

  socket.off("setup", (userId) => {
    socket.leave(userId);
  });
});
