import Joi from "joi";
import { Schema, Types, model } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  foods: {
    food: Types.ObjectId;
    quantity: number;
  }[];
  status: string;
  note: string;
  delivery_way: string;
  delivery_address: string;
  total_price: number;
}
1;

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foods: [
      {
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, default: 0 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    note: { type: String, required: false },
    delivery_way: { type: String, required: true },
    delivery_address: { type: String, required: true },
    total_price: { type: Number, required: true },
  },
  { timestamps: true }
);

export function validateOrder(order: IOrder) {
  const schema = Joi.object({
    user: Joi.required(),
    foods: Joi.array().items(
      Joi.object({
        food: Joi.required(),
        quantity: Joi.number().required(),
      })
    ),
    status: Joi.string(),
    note: Joi.string(),
    delivery_way: Joi.string().required(),
    delivery_address: Joi.string().required(),
    total_price: Joi.number().required(),
  });

  return schema.validate(order);
}

export const Order = model<IOrder>("Order", orderSchema);
