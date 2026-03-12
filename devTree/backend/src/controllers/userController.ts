import type { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    // unique handle
    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists && handleExists.email !== req.user.email) {
      // if handle exists and its not ourselves
      const error = new Error("Username already exists");
      return res.status(409).json({ error: error.message });
    }

    req.user.description = description;
    req.user.handle = handle;
    await req.user.save();
    res.send("Profile updated successfully");
  } catch (e) {
    const error = new Error("Something wrong happened");
    return res.status(500).json({ error: error.message });
  }
};
