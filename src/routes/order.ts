import { get_order, post_order, post_cancel_order } from "../controllers/order";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/:id", auth, get_order);
router.post("/", auth, post_order);
router.delete("/:id", auth, post_cancel_order);

export default router;
