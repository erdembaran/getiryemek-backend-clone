import { Food } from "../models/food";
import { Restaurant } from "../models/restaurant";
import { Request, Response } from "express";

export const get_restaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    if (!restaurants) return res.status(404).send("No restaurants found");
    res.send(restaurants);
  } catch (error) {
    console.log(error);
  }
};

export const get_food_by_restaurant = async (req: Request, res: Response) => {
  try {
    const food = await Food.findById({
      restaurant: req.params.restaurantId,
      _id: req.params.foodId,
    });
    if (!food) return res.status(404).send("No food found");
    res.send(food);
  } catch (error) {
    console.log(error);
  }
};
export const get_foods_by_restaurant = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find({ restaurant: req.params.restaurantId });
    if (!foods) return res.status(404).send("No foods found");
    res.send(foods);
  } catch (error) {
    console.log(error);
  }
};
