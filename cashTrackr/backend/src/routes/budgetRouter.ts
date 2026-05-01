import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateId } from "../middleware/id";
import {
  validateBudgetExists,
  validateBudgetInput,
} from "../middleware/budget";

const router = Router();

router.get("/", BudgetController.getAll);

router.post(
  "/",
  validateBudgetInput,
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
  validateBudgetInput,
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
