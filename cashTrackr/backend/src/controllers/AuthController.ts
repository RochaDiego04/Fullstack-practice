import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      const error = new Error("The email is already in use");
      res.send(409).json({ error: error.message });
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);

      await user.save();
      res.json("Account created successfully");
    } catch (error) {
      res.status(500).json({ error: "Error creating account" });
    }
  };
}
