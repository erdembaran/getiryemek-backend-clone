import { get_user, put_update_user, delete_user } from "../controllers/user";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/:id", auth, get_user);
router.put("/:id", auth, put_update_user);
router.delete("/:id", auth, delete_user);

export default router;
