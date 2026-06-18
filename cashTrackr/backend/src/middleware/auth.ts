import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("Unauthorized");
    return res.status(401).json({ error: error.message });
  }

  const [_, token] = bearer.split(" "); // remove bearer text

  if (!token) {
    const error = new Error("Invalid Token");
    return res.status(401).json({ error: error.message });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findByPk(+decoded.id, {
        attributes: ["id", "name", "email"],
      });

      if (!user) {
        const error = new Error("The user no longer exists");
        res.status(404).json({ error: error.message });
        return;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid Token" });
  }

  res.json({ token });
};
