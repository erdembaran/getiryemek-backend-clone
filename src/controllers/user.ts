import { User } from "../models/user";
import { Request, Response } from "express";

export const get_user = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
