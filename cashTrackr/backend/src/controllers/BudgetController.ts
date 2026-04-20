import type { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        // TODO: Filter by authenticatd user
      });

      res.json(budgets);
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
    try {
      const { id } = req.params;
      const budget = await Budget.findByPk(+id);

      if (!budget) {
        const error = new Error("Budget not found");
        return res.status(404).json({ error: error.message });
      }
      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    console.log("");
  };

  static deleteById = async (req: Request, res: Response) => {
    console.log("");
  };
}
