import Joi from "joi";
import { Schema, Types, model } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  foods: {
    food: Types.ObjectId;
    quantity: number;
  }[];
}
1;

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foods: [
      {
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export function validateCart(cart: ICart) {
  const schema = Joi.object({
    user: Joi.required(),
    foods: Joi.array().items(
      Joi.object({
        food: Joi.required(),
        quantity: Joi.number().required(),
      })
    ),
  });

  return schema.validate(cart);
}

export const Cart = model<ICart>("Cart", cartSchema);
