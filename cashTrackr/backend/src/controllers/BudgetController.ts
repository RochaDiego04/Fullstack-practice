import type { Request, Response } from "express";
import Budget from "../models/Budget";

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
    res.json({ body: req.budget });
  };

  static updateById = async (req: Request, res: Response) => {
    const { id: _id, ...updateData } = req.body;
    await req.budget.update(updateData);
    res.json({ message: "Budget updated successfully", body: req.budget });
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.json({ message: "Budget deleted successfully", body: req.budget });
  };
}
