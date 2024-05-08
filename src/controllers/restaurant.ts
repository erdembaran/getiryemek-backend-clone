import { Restaurant } from "../models/restaurant";
import { Request, Response } from "express";

export const get_foods_by_restaurant = async (req: Request, res: Response) => {
  try {
    const foods = await Restaurant.findById(req.params.id).populate("foods");
    if (!foods) return res.status(404).send("No foods found");
    res.send(foods);
  } catch (error) {
    console.log(error);
  }
};

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
    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    ).populate("foods");
    if (!restaurant) return res.status(404).send("No restaurant found");
    const food = restaurant.foods.find(
      (food) => food._id.toString() === req.params.foodId
    );
    if (!food) return res.status(404).send("No food found");
  } catch (error) {
    console.log(error);
  }
};
