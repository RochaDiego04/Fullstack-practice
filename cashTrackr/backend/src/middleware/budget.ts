import { Request, Response, NextFunction } from "express";
import Budget from "../models/Budget";
import { body } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findByPk(+id);

    if (!budget) {
      const error = new Error("Budget not found");
      return res.status(404).json({ error: error.message });
    }
    req.budget = budget;

    next();
  } catch (error) {
    res.status(500).json({ error: "There was an error" });
  }
};

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await body("name")
    .optional()
    .notEmpty()
    .withMessage("The budget's name cannot be empty")
    .run(req);
  await body("amount")
    .optional()
    .isNumeric()
    .withMessage("Not valid quantity")
    .custom((value) => value > 0)
    .withMessage("Amount must be greater than 0")
    .run(req);

  next();
};
