import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, validateRegister, validateLogin } from "../models/user";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

export const post_register = async (req: Request, res: Response) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    });

    const registeredUser = await newUser.save();
    const token = jwt.sign(
      { id: registeredUser._id },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    res.header("x-auth-token", token).send(registeredUser);
  } catch (error) {
    console.log(error);
  }
};

export const post_login = async (req: Request, res: Response) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.send(token);
  } catch (error) {
    console.log(error);
  }
};
