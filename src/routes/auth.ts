import {
  post_register,
  post_login,
  post_forgot_password,
  put_reset_password,
} from "../controllers/auth";
import express from "express";
const router = express.Router();

router.post("/register", post_register);
router.post("/login", post_login);
router.post("/forgot-password", post_forgot_password);
router.put("/reset-password/:token", put_reset_password);

export default router;
