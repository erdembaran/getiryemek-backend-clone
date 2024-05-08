import { get_restaurants, get_restaurant } from "../controllers/restaurant";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, get_restaurants);
router.get("/:id", auth, get_restaurant);

export default router;
