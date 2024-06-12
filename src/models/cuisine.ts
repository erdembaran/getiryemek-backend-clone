import { Schema, Types, model } from "mongoose";

export interface ICuisine {
  name: string;
  imageUrl: string;
  restaurants?: Types.ObjectId[];
}

const cuisineSchema = new Schema<ICuisine>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  },
  { timestamps: true }
);

export const Cuisine = model<ICuisine>("Cuisine", cuisineSchema);
