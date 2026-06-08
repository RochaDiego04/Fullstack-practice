import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import {
  validateBudgetExists,
  validateBudgetInput,
  validateBudgetId,
} from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseExists } from "../middleware/expenses";
import {
  validateExpenseId,
  validateExpenseInput,
} from "../middleware/expenses";

const router = Router();

router.param("budgetId", validateBudgetId);
router.param("expenseId", validateExpenseId);

router.get("/", BudgetController.getAll);

router.post(
  "/",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create,
);

router.get(
  "/:budgetId",
  handleInputErrors,
  validateBudgetExists,
  BudgetController.getById,
);

router.patch(
  "/:budgetId",
  validateBudgetInput,
  handleInputErrors,
  validateBudgetExists,
  BudgetController.updateById,
);

router.delete(
  "/:budgetId",
  handleInputErrors,
  validateBudgetExists,
  BudgetController.deleteById,
);

/* Routes for expenses */

router.post(
  "/:budgetId/expenses",
  validateExpenseInput,
  handleInputErrors,
  validateBudgetExists,
  ExpensesController.create,
);
router.get(
  "/:budgetId/expenses/:expenseId",
  validateBudgetExists,
  validateExpenseExists,
  ExpensesController.getById,
);
router.patch(
  "/:budgetId/expenses/:expenseId",
  validateExpenseInput,
  handleInputErrors,
  validateBudgetExists,
  validateExpenseExists,
  ExpensesController.updateById,
);
router.delete(
  "/:budgetId/expenses/:expenseId",
  handleInputErrors,
  validateBudgetExists,
  validateExpenseExists,
  ExpensesController.deleteById,
);

export default router;
