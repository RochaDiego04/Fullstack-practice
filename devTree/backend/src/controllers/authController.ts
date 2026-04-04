import type { Request, Response } from "express";
import User from "../models/User";
import slug from "slug";
import { hashPassword, verifyPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // unique user
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User email already exists");
    return res.status(409).json({ error: error.message });
  }

  // unique handle
  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Username already exists");
    return res.status(409).json({ error: error.message });
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;

  await user.save();

  res.status(201).send("User created succesfully");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // unique user
  if (!user) {
    const error = new Error("User doesn't exist");
    return res.status(404).json({ error: error.message });
  }

  // Validate password
  const isValidPassword = await verifyPassword(user.password, password);
  if (!isValidPassword) {
    const error = new Error("Password is incorrect");
    return res.status(401).json({ error: error.message });
  }

  const token = generateJWT({ id: user._id });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days in ms
  });

  res.send("Login successful");
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.send("Logout successful");
};
