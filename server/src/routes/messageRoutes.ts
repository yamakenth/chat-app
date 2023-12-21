import express from "express";
import {
  createMessage,
  getChatbotResponse,
  getMessageList,
} from "../controllers";

const router = express.Router();

router.get("/:chatId", getMessageList);
router.post("/", createMessage);
router.get("/chatbot/:chatId", getChatbotResponse);

export default router;
