import { Schema, Types, model } from "mongoose";

export interface IRestaurant {
  title: string;
  imageUrl: string;
  foods: {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  }[];
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
    foods: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true },
      },
    ],
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

export const Restaurant = model<IRestaurant>("Restaurant", restaurantSchema);
