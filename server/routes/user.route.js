import express from "express";
import {
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/:id", getUserById);

export default router;
