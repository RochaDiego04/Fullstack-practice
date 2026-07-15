import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await body("name")
    .optional()
    .notEmpty()
    .withMessage("The expense name cannot be empty")
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

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  expenseId: string,
) => {
  const id = parseInt(expenseId);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid expense ID" });
  }
  next();
};

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(+expenseId);

    if (!expense) {
      return res.status(404).json({ error: "Gasto no encontrado" });
    }
    req.expense = expense;

    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};
