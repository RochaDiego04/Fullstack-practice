import { Router } from "express";
import { createAccount } from "./controllers/authController";

const router = Router();

// Auth & Register
router.post("/auth/register", createAccount);

export default router;
