import Joi from "joi";
import { Schema, Types, model } from "mongoose";

export interface ICart {
  user: { type: Types.ObjectId; ref: "User" };
  foods: {
    type: Types.ObjectId;
    ref: "Food";
    quantity: number;
  }[];
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export function validateCart(cart: ICart) {
  const schema = Joi.object({
    user: Joi.string().required(),
    foods: Joi.array().items(
      Joi.object({
        food: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    ),
  });

  return schema.validate(cart);
}

export const Cart = model<ICart>("User", cartSchema);