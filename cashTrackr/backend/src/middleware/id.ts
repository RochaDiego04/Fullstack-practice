import { param } from "express-validator";

export const validateId = param("id")
  .isInt()
  .withMessage("Invalid ID")
  .custom((value) => value > 0)
  .withMessage("Invalid negative ID");
