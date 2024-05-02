import {
  get_restaurants,
  get_food_by_restaurant,
  get_foods_by_restaurant,
} from "../controllers/restaurant";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, get_restaurants);
router.get("/:restaurantId/:foodId", auth, get_food_by_restaurant);
router.get("/:restaurantId", auth, get_foods_by_restaurant);

export default router;
