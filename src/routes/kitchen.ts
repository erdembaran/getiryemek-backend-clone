import {
  get_kitchens,
  get_restaurants_by_kitchen,
} from "../controllers/kitchen";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, get_kitchens);
router.get("/:id", auth, get_restaurants_by_kitchen);

export default router;
