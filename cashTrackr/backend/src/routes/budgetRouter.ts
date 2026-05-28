import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateId } from "../middleware/id";
import {
  validateBudgetExists,
  validateBudgetInput,
  validateBudgetId,
} from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";

const router = Router();

router.param("budgetId", validateBudgetId);

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

/* Routes for expenses */

router.get("/:budgetId/expenses", ExpensesController.getAll);
router.post("/:budgetId/expenses", ExpensesController.create);
router.get("/:budgetId/expenses/:expenseId", ExpensesController.getById);
router.put("/:budgetId/expenses/:expenseId", ExpensesController.updateById);
router.delete("/:budgetId/expenses/:expenseId", ExpensesController.deleteById);

export default router;
