import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  loginUser,
  updateUser,
} from "../controllers";

const router = express.Router();

router.get("/", getUserList);
router.get("/:userId", getUser);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
