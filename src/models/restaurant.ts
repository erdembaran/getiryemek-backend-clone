import { Schema, Types, model } from "mongoose";
import Joi from "joi";

export interface IRestaurant {
  title: string;
  imageUrl: string;
  foods: Types.ObjectId[];
  openingHours: string;
  isOpen: boolean;
  deliveryMethod: string;
  paymentMethods: string[];
  rating?: number;
  reviews?: {
    comment?: string;
    rating?: number;
  }[];
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    foods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
    openingHours: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    deliveryMethod: { type: String, required: true },
    paymentMethods: [{ type: String, required: true }],
    rating: { type: Number, required: false },
    reviews: [
      {
        comment: { type: String, required: false },
        rating: { type: Number, required: false },
      },
    ],
  },
  { timestamps: true }
);

export function validateRestaurant(restaurant: IRestaurant) {
  const schema = Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    foods: Joi.array().required(),
    openingHours: Joi.string().required(),
    isOpen: Joi.boolean().required(),
    deliveryMethod: Joi.string().required(),
    paymentMethods: Joi.array().items(Joi.string()).required(),
    rating: Joi.number().optional(),
    reviews: Joi.array().items(
      Joi.object({
        comment: Joi.string().optional(),
        rating: Joi.number().optional(),
      })
    ),
  });

  return schema.validate(restaurant);
}

export const Restaurant = model<IRestaurant>("Restaurant", restaurantSchema);
