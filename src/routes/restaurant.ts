import {
  get_restaurants,
  get_restaurant,
  get_food_by_restaurant,
  post_add_restaurant,
} from "../controllers/restaurant";
import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, get_restaurants);
router.get("/:id", auth, get_restaurant);
router.get("/:restaurantId/:foodId", auth, get_food_by_restaurant);
router.post("/", auth, post_add_restaurant);

export default router;
