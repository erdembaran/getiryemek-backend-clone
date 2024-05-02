import { User } from "../models/user";
import { Request, Response } from "express";
import { validateUser } from "../models/user";

export const get_user = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const put_update_user = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.addresses = req.body.addresses;

    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const delete_user = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send("user deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
