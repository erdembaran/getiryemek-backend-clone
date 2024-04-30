import { post_register, post_login } from "../controllers/auth";
import express from "express";
const router = express.Router();

router.post("/register", post_register);
router.post("/login", post_login);

export default router;
