import { get_category, get_categories } from "../controllers/category";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, get_categories);
router.get("/:id", auth, get_category);

export default router;
