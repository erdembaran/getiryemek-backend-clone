import { get_user } from "../controllers/user";
import express from "express";
const router = express.Router();

router.get("/:id", get_user);

export default router;
