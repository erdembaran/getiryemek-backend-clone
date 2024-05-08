import { Restaurant } from "../models/restaurant";
import { Request, Response } from "express";

export const get_restaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).send("No restaurant found");
    res.send(restaurant);
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
