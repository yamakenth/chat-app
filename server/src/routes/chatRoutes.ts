import express from "express";
import { createChat, deleteChat, getChat, getChatList } from "../controllers";

const router = express.Router();

router.get("/", getChatList);
router.get("/:chatId", getChat);
router.post("/", createChat);
router.delete("/:chatId", deleteChat);

export default router;
