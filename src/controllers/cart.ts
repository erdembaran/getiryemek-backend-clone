import { Request, Response } from "express";
import { Cart, ICart, validateCart } from "../models/cart";

export const get_cart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id }).populate(
      "user foods.food"
    );
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

    const { user, foods } = req.body as ICart;
    let cart = await Cart.findOne({ user });
    if (cart) {
      foods.forEach((item) => {
        const existingFood = cart?.foods.find(
          (foodItem) => foodItem.food.toString() === item.food.toString()
        );
        if (existingFood) {
          existingFood.quantity += item.quantity;
        } else {
          cart?.foods.push(item);
        }
      });
    } else {
      cart = new Cart({ user, foods });
    }

    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

export const post_remove_from_cart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).send("No cart found");
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};
