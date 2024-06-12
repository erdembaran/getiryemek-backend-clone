import mongoose from "mongoose";
import { Request, Response } from "express";
import { Order, IOrder, validateOrder } from "../models/order";

export const get_order = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user foods.food"
    );
    if (!order) return res.status(404).send("Order not found");
    res.send(order);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const post_order = async (req: Request, res: Response) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const order = new Order(req.body);
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const post_cancel_order = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send("Order cancelled");
    res.send(order);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
