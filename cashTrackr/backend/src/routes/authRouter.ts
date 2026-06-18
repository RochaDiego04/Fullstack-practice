import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(limiter);

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

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid token"),
  handleInputErrors,
  AuthController.confirmAccount,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid e-mail"),
  body("password").notEmpty().withMessage("password is mandatory"),
  handleInputErrors,
  AuthController.login,
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Invalid e-mail"),
  handleInputErrors,
  AuthController.forgotPassword,
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid token"),
  handleInputErrors,
  AuthController.validateToken,
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid token"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be greater than 8 characters"),
  handleInputErrors,
  AuthController.resetPasswordWithToken,
);

router.get("/user", authenticate, AuthController.getUser);

router.post(
  "/update-password",
  authenticate,
  body("current_password")
    .notEmpty()
    .withMessage("Actual password cannot be empty"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("New password must be greater than 8 characters"),
  handleInputErrors,
  AuthController.updateCurrUserPassword,
);

router.post(
  "/check-password/:token",
  authenticate,
  body("password").notEmpty().withMessage("Password cannot be empty"),
  handleInputErrors,
  AuthController.checkPassword,
);

export default router;
