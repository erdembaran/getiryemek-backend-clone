import { Schema, model } from "mongoose";

export interface IFood {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const foodSchema = new Schema<IFood>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Food = model<IFood>("Food", foodSchema);
