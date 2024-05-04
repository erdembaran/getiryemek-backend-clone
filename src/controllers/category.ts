import { Category } from "../models/category";
import { Request, Response } from "express";

export const get_categories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().populate("restaurants");
    if (!categories) return res.status(404).send("No categories found");
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
};

export const get_category = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "restaurants"
    );
    if (!category) return res.status(404).send("No category found");
    res.send(category);
  } catch (error) {
    console.log(error);
  }
};
