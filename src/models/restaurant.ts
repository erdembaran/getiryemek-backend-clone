import { Schema, Types, model } from "mongoose";

export interface IRestaurant {
  title: string;
  imageUrl: string;
  foods: Types.ObjectId[];
  openingHours: string;
  isOpen: boolean;
  categories: Types.ObjectId[];
  deliveryMethod: string;
  paymentMethods: string[];
  rating: number;
  reviews: {
    comment: string;
    rating: number;
  }[];
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
      },
    ],

    openingHours: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    deliveryMethod: { type: String, required: true },
    paymentMethods: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    reviews: [
      {
        comment: { type: String, required: false },
        rating: { type: Number, required: false },
      },
    ],
  },
  { timestamps: true }
);

export const Restaruant = model<IRestaurant>("Restaruant", restaurantSchema);
