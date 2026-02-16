import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "./controllers/authController";

const router = Router();

// Auth & Register
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle cannot be empty"),
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters length"),
  createAccount,
);

export default router;
