import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      const error = new Error("User doesn't exist anymore");
      return res.status(404).json({ error: error.message });
    }

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
