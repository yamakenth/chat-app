import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  loginUser,
  updateUser,
} from "../controllers";
import { auth } from "../middleware";

const router = express.Router();

router.get("/", getUserList);
router.get("/:userId", getUser);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/:userId", auth, updateUser);
router.delete("/:userId", auth, deleteUser);

export default router;
