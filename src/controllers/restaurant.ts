import {
  Restaurant,
  IRestaurant,
  validateRestaurant,
} from "../models/restaurant";
import { Food, IFood } from "../models/food";

import { Request, Response } from "express";

export const get_restaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "foods"
    );
    if (!restaurant) return res.status(404).send("No restaurant found");
    res.send(restaurant);
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
    res.send(food);
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

export const post_add_restaurant = async (req: Request, res: Response) => {
  try {
    const { error } = validateRestaurant(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foodDocuments = req.body.foods.map(
      (food: IFood) => new Food({ ...food, restaurant: undefined })
    );
    const savedFoods = [];
    for (const food of foodDocuments) {
      const savedFood = await food.save();
      savedFoods.push(savedFood);
    }

    const foodIds = savedFoods.map((food) => food._id);

    const restaurant = new Restaurant({
      ...req.body,
      foods: foodIds,
    });

    await restaurant.save();

    for (const food of savedFoods) {
      food.restaurant = restaurant._id;
      await food.save();
    }

    res.status(201).send(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
