import Joi from "joi";
import { Schema, Types, model } from "mongoose";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  phone: number;
  addresses?: string[];
  favRestaurants?: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String, required: false },
    resetTokenExpiration: { type: Date, required: false },
    phone: { type: Number, required: true },
    addresses: { type: [String], required: false },
    favRestaurants: { type: [String], required: false },
  },
  { timestamps: true }
);

export function validateUser(user: IUser) {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    addresses: Joi.array().items(Joi.string()),
    favRestaurants: Joi.array().items(Joi.string()),
  });

  return schema.validate(user);
}

export function validateRegister(user: IUser) {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    resetToken: Joi.string(),
    resetTokenExpiration: Joi.date(),
    phone: Joi.number().required(),
  });

  return schema.validate(user);
}

export function validateLogin(user: IUser) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

export const User = model<IUser>("User", userSchema);
