import {
  get_cart,
  post_add_to_cart,
  post_remove_from_cart,
} from "../controllers/cart";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/:id", auth, get_cart);
router.post("/", auth, post_add_to_cart);
router.delete("/:id", auth, post_remove_from_cart);

export default router;
