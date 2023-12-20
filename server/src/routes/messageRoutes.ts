import express from "express";
import { createMessage, getMessageList } from "../controllers";

const router = express.Router();

router.get("/:chatId", getMessageList);
router.post("/", createMessage);

export default router;
