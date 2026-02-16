import type { Request, Response } from "express";
import User from "../models/User";
import slug from "slug";
import { hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  // express validatior errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

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

  res.status(201).send("");
};
