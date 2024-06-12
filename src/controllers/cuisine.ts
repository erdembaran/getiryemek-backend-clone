import { Cuisine } from "../models/cuisine";
import { Request, Response } from "express";

export const get_cuisine = async (req: Request, res: Response) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id).populate(
      "restaurants"
    );
    if (!cuisine) return res.status(404).send("No cuisine found");
    res.send(cuisine);
  } catch (error) {
    console.log(error);
  }
};

export const get_cuisines = async (req: Request, res: Response) => {
  try {
    const cuisines = await Cuisine.find().populate("restaurants");
    if (!cuisines) return res.status(404).send("No cuisines found");
    res.send(cuisines);
  } catch (error) {
    console.log(error);
  }
};

export const post_add_cuisine = async (req: Request, res: Response) => {
  try {
    const cuisine = new Cuisine({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      restaurants: req.body.restaurants,
    });

    await cuisine.save();
    res.status(201).send("Cuisine added successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
