import Joi from "joi";
import { Schema, Types, model } from "mongoose";

export interface IFood {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  foodTags: string[];
  category: string;
  restaurant: Types.ObjectId;
}

const foodSchema = new Schema<IFood>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    foodTags: { type: [String], required: true },
    category: { type: String, required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

export function validateFood(food: IFood) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required(),
    foodTags: Joi.array().items(Joi.string()),
    category: Joi.string().required(),
    restaurant: Joi.string().required(),
  });

  return schema.validate(food);
}

export const Food = model<IFood>("Food", foodSchema);
