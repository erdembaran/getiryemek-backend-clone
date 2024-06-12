import { Schema, Types, model } from "mongoose";

export interface IFood {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurant: Types.ObjectId;
}

const foodSchema = new Schema<IFood>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
});

export const Food = model<IFood>("Food", foodSchema);
