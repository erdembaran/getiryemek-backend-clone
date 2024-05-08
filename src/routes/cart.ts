import {
  get_cart,
  post_add_to_cart,
  post_remove_from_cart,
  put_update_cart,
} from "../controllers/cart";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/:id", auth, get_cart);
router.post("/:id", auth, post_add_to_cart);
router.post("/remove/:id", auth, post_remove_from_cart);
router.put("/:id", auth, put_update_cart);

export default router;
