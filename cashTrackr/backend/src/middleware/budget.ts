import { Request, Response, NextFunction } from "express";
import Budget from "../models/Budget";

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
