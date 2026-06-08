import type { Request, Response } from "express";
import Expense from "../models/Expense";
import Budget from "../models/Budget";

export class ExpensesController {
  static create = async (req: Request, res: Response) => {
    try {
      const expense = new Expense(req.body);
      expense.budgetId = req.budget.id;
      await expense.save();
      res.status(201).json("Expense added successfully");
    } catch (error) {
      res.status(500).json({ error: `There was an error: ${error}` });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      res.json(req.expense);
    } catch (error) {
      res.status(500).json({ error: `There was an error: ${error}` });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    await req.expense.update({ name, amount });
    res.json({ message: "Expense updated successfully", body: req.expense });
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy();
    res.json({ message: "Expense deleted successfully", body: req.expense });
  };
}
