import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateId } from "../middleware/id";
import { validateBudgetExists } from "../middleware/budget";

const router = Router();

router.get("/", BudgetController.getAll);

router.post(
  "/",
  body("name").notEmpty().withMessage("The budget's name cannot be empty"),
  body("amount")
    .notEmpty()
    .withMessage("The amount quantity name cannot be empty")
    .isNumeric()
    .withMessage("Not valid quantity")
    .custom((value) => value > 0)
    .withMessage("Amount must be greater than 0"),
  handleInputErrors,
  BudgetController.create,
);

router.get(
  "/:id",
  validateId,
  handleInputErrors,
  validateBudgetExists,
  BudgetController.getById,
);

router.patch(
  "/:id",
  validateId,
  body("name")
    .optional()
    .notEmpty()
    .withMessage("The budget's name cannot be empty"),
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Not valid quantity")
    .custom((value) => value > 0)
    .withMessage("Amount must be greater than 0"),
  handleInputErrors,
  validateBudgetExists,
  BudgetController.updateById,
);

router.delete(
  "/:id",
  validateId,
  handleInputErrors,
  validateBudgetExists,
  BudgetController.deleteById,
);

export default router;
