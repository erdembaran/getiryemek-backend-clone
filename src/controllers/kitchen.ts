import { Kitchen } from "../models/kitchen";
import { Request, Response } from "express";

export const get_kitchens = async (req: Request, res: Response) => {
  try {
    const kitchens = await Kitchen.find().populate("restaurants");
    if (!kitchens) return res.status(404).send("No kitchens found");
    res.send(kitchens);
  } catch (error) {
    console.log(error);
  }
};

export const get_kitchen = async (req: Request, res: Response) => {
  try {
    const kitchen = await Kitchen.findById(req.params.id).populate(
      "restaurants"
    );
    if (!kitchen) return res.status(404).send("No kitchen found");
    res.send(kitchen);
  } catch (error) {
    console.log(error);
  }
};
