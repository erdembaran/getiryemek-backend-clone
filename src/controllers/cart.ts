import { Cart, validateCart } from "../models/cart";
import { Request, Response } from "express";

export const get_cart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id }).populate("foods");
    if (!cart) return res.status(404).send("No cart found");
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};

export const post_add_to_cart = async (req: Request, res: Response) => {
  try {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let cart = await Cart.findOne({ user: req.params.id });
    if (!cart) {
      cart = new Cart({
        user: req.params.id,
        foods: req.body.foods,
      });

      const existingFoodIndex = cart.foods.findIndex(
        (item) => item.food.toString() === req.body.foods[0].foodId
      );
      if (existingFoodIndex !== -1) {
        cart.foods[existingFoodIndex].quantity += req.body.foods[0].quantity;
      } else {
        cart.foods = cart.foods.concat(req.body.foods);
      }
      await cart.save();
      return res.send(cart);
    }
  } catch (error) {
    console.log(error);
  }
};

export const post_remove_from_cart = async (req: Request, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.params.id });
    if (!cart) return res.status(404).send("No cart found");

    const existingFoodIndex = cart.foods.findIndex(
      (item) => item.food.toString() === req.body.foodId
    );
    if (existingFoodIndex !== -1) {
      if (cart.foods[existingFoodIndex].quantity > 1) {
        cart.foods[existingFoodIndex].quantity -= 1;
      } else {
        cart.foods = cart.foods.filter(
          (item) => item.food.toString() !== req.body.foodId
        );
      }
      await cart.save();
      return res.send(cart);
    }
  } catch (error) {
    console.log(error);
  }
};

export const put_update_cart = async (req: Request, res: Response) => {
  try {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let cart = await Cart.findOne({ user: req.params.id });
    if (!cart) return res.status(404).send("No cart found");

    const existingFoodIndex = cart.foods.findIndex(
      (item) => item.food.toString() === req.body.foods[0].foodId
    );
    if (existingFoodIndex !== -1) {
      cart.foods[existingFoodIndex].quantity = req.body.foods[0].quantity;
    } else {
      cart.foods = cart.foods.concat(req.body.foods);
    }
    await cart.save();
    return res.send(cart);
  } catch (error) {
    console.log(error);
  }
};
