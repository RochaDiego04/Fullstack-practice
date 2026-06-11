import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be greater than 8 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  handleInputErrors,
  AuthController.createAccount,
);

export default router;
