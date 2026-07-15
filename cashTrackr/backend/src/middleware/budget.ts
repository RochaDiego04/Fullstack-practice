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

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  budgetId: string,
) => {
  const id = parseInt(budgetId);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ errors: ["Invalid budget ID"] });
  }
  next();
};

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findByPk(+budgetId);

    if (!budget) {
      return res
        .status(404)
        .json({ errors: ["Presupuesto no encontrado"] });
    }
    req.budget = budget;

    next();
  } catch (error) {
    res.status(500).json({ errors: ["Hubo un error"] });
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

export const hasAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.budget.userId !== req.user.id) {
    return res.status(401).json({ errors: ["Acción no válida"] });
  }
  next();
};
