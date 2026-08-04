import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import {
  validateBudgetExists,
  validateBudgetInput,
  validateBudgetId,
  hasAccess,
} from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseExists } from "../middleware/expenses";
import {
  validateExpenseId,
  validateExpenseInput,
} from "../middleware/expenses";
import { authenticate } from "../middleware/auth";
import { belongsToBudget } from "../middleware/expense";

const router = Router();

router.use(authenticate);

router.param("budgetId", validateBudgetId);
router.param("expenseId", validateExpenseId);
router.param("expenseId", belongsToBudget);

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
  hasAccess,
  BudgetController.getById,
);

router.patch(
  "/:budgetId",
  validateBudgetInput,
  handleInputErrors,
  validateBudgetExists,
  hasAccess,
  BudgetController.updateById,
);

router.delete(
  "/:budgetId",
  handleInputErrors,
  validateBudgetExists,
  hasAccess,
  BudgetController.deleteById,
);

/* Routes for expenses */

router.post(
  "/:budgetId/expenses",
  validateExpenseInput,
  handleInputErrors,
  validateBudgetExists,
  hasAccess,
  ExpensesController.create,
);
router.get(
  "/:budgetId/expenses/:expenseId",
  validateBudgetExists,
  hasAccess,
  validateExpenseExists,
  ExpensesController.getById,
);
router.patch(
  "/:budgetId/expenses/:expenseId",
  validateExpenseInput,
  handleInputErrors,
  validateBudgetExists,
  hasAccess,
  validateExpenseExists,
  ExpensesController.updateById,
);
router.delete(
  "/:budgetId/expenses/:expenseId",
  handleInputErrors,
  validateBudgetExists,
  hasAccess,
  validateExpenseExists,
  ExpensesController.deleteById,
);

export default router;
