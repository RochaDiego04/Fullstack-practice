import type { Request, Response } from "express";
import User from "../models/User";
import { compareHashedPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      const error = new Error("The email is already in use");
      res.status(409).json({ error: error.message });
      return;
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.token = generateToken();

      await user.save();

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      res.json("Account created successfully");
    } catch (error) {
      res.status(500).json({ error: "Error creating account" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    const token = req.body.token;

    const user = await User.findOne({ where: { token: token } });
    if (!user) {
      const error = new Error("Invalid token");
      return res.status(401).json({ error: error.message });
    }

    user.confirmed = true;
    user.token = null;
    await user.save();

    res.json("Account confirmed successfully");
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ error: error.message });
    }
    if (!user.confirmed) {
      const error = new Error(
        "You must verify your account first, please check your email",
      );
      return res.status(403).json({ error: error.message });
    }

    const isCorrectPassword = await compareHashedPassword(
      password,
      user.password,
    );
    if (!isCorrectPassword) {
      const error = new Error("Incorrect password");
      return res.status(401).json({ error: error.message });
    }

    const token = generateJWT(user.id);
    res.json(token);
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ error: error.message });
    }

    try {
      user.token = generateToken();
      await user.save();

      await AuthEmail.sendPasswordResetToken({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      res.json("Check your email for more instructions");
    } catch (error) {
      res.status(500).json({ error: "Error sending password reset email" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    res.json(token);

    const tokenExists = await User.findOne({ where: { token: token } });
    if (!tokenExists) {
      const error = new Error("Invalid token");
      return res.status(404).json({ error: error.message });
    }
    res.json("");
  };

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token: token } });
    if (!user) {
      const error = new Error("Invalid token");
      return res.status(404).json({ error: error.message });
    }

    user.password = await hashPassword(password);
    user.token = null;
    await user.save();

    res.json("Password modified");
  };

  static getUser = async (req: Request, res: Response) => {
    res.json(req.user);
  };

  static updateCurrUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;
    const { id } = req.user;

    const user = await User.findByPk(id);
    const isPasswordCorrect = await compareHashedPassword(
      current_password,
      user.password,
    );

    if (!isPasswordCorrect) {
      const error = new Error("Actual password is incorrect");
      return res.status(401).json({ error: error.message });
    }

    user.password = await hashPassword(password);
    await user.save();

    res.json("Password updated successfully");
  };

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.user;

    const user = await User.findByPk(id);
    const isPasswordCorrect = await compareHashedPassword(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      const error = new Error("Actual password is incorrect");
      return res.status(401).json({ error: error.message });
    }

    res.json("Correct password");
  };
}
