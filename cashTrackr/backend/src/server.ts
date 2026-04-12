import express from "express";
import colors from "colors";
import morgan from "morgan";
import { db } from "./config/db";
import budgetRouter from "./routes/budgetRouter";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Successful connection to DB"));
  } catch (_error) {
    console.log(colors.red.bold("Failed connection to DB"));
  }
}
connectDB();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/budgets", budgetRouter);

export default app;
