import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";

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
  param("id")
    .isInt()
    .withMessage("Invalid ID")
    .custom((value) => value > 0)
    .withMessage("Invalid negative ID"),
  handleInputErrors,
  BudgetController.getById,
);
router.patch("/:id", BudgetController.updateById);
router.delete("/:id", BudgetController.deleteById);

export default router;
