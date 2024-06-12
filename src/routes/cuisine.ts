import {
  get_cuisines,
  get_cuisine,
  post_add_cuisine,
} from "../controllers/cuisine";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, get_cuisines);
router.get("/:id", auth, get_cuisine);
router.post("/", auth, post_add_cuisine);

export default router;
