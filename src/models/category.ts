import { Schema, Types, model } from "mongoose";

export interface ICategory {
  name: string;
  imageUrl: string;
  restaurants: { type: Types.ObjectId; ref: "Restaurant" }[];
}

const cateogorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", cateogorySchema);
