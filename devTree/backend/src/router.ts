import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";
import { createAccount, login } from "./controllers/authController";
import {
  getUser,
  updateProfile,
  uploadImage,
} from "./controllers/userController";

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
  handleInputErrors,
  createAccount,
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  handleInputErrors,
  login,
);

router
  .get("/user", authenticate, getUser)
  .patch(
    "/user",
    authenticate,
    body("handle").notEmpty().withMessage("Handle cannot be empty"),
    body("description").notEmpty().withMessage("Description cannot be empty"),
    handleInputErrors,
    updateProfile,
  )
  .post("/user/image", authenticate, uploadImage);

export default router;
