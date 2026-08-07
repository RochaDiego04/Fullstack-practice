import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    // The only endpoint that reports several failures at once, so the only one
    // that responds with a list. Everywhere else uses { error: string }.
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }
  next();
};
