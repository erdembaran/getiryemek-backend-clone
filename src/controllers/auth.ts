import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import emailService from "../helpers/send-mail";
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

export const post_forgot_password = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();

    emailService.sendMail({
      from: process.env.SMTP_USERNAME as string,
      to: user.email,
      subject: "Reset Password",
      html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://127.0.0.1:3000/reset-password/${resetToken}">Reset Password</a> to set a new password</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
    `,
    });

    res.status(200).send("Password reset link sent to your email");
  } catch (error) {
    console.log(error);
  }
};

export const put_reset_password = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) return res.status(400).send("Invalid or expired token");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();
    res.status(200).send("Password reset successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
