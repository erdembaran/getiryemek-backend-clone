import Joi from "joi";
import { Schema, Types, model } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  foods: {
    food: Types.ObjectId;
    quantity: number;
  }[];
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foods: [
      {
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, default: 0, required: true },
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

export const Cart = model<ICart>("Cart", cartSchema);
