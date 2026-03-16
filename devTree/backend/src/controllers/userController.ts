import type { Request, Response } from "express";
import slug from "slug";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import User from "../models/User";
import { randomUUID } from "crypto";

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body;

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
    req.user.links = links;
    await req.user.save();
    res.send("Profile updated successfully");
  } catch (e) {
    const error = new Error("Something wrong happened");
    return res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      if (error) {
        return res.status(500).json({ error: "Error parsing form" });
      }

      if (!files.file?.[0]) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: randomUUID() },
        async function (uploadError, result) {
          if (uploadError) {
            return res
              .status(500)
              .json({ error: "Image couldn't be uploaded" });
          }
          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            res.json({ image: result.secure_url });
          }
        },
      );
    });
  } catch (e) {
    const error = new Error("Something wrong happened");
    return res.status(500).json({ error: error.message });
  }
};
