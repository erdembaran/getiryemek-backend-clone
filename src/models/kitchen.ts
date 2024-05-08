import { Schema, Types, model } from "mongoose";

export interface IKitchen {
  name: string;
  imageUrl: string;
  restaurants?: Types.ObjectId[];
}

const kitchenSchema = new Schema<IKitchen>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  },
  { timestamps: true }
);

export const Kitchen = model<IKitchen>("Kitchen", kitchenSchema);
