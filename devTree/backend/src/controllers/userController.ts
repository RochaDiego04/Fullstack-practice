import type { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};
