import type { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        // TODO: Filter by authenticatd user
      });

      res.json({ body: budgets });
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      await budget.save();
      res.status(200).json("Budget created successfully");
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    // Instead of using the budget middleware (req.budget)
    // We will get the budget again but with Expenses
    const budget = await Budget.findByPk(req.budget.id, {
      include: [Expense],
    });
    res.json({ body: budget });
  };

  static updateById = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    await req.budget.update({ name, amount });
    res.json({ message: "Budget updated successfully", body: req.budget });
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.json({ message: "Budget deleted successfully", body: req.budget });
  };
}
