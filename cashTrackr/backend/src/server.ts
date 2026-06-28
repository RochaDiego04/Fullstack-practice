import express from "express";
import colors from "colors";
import morgan from "morgan";
import { db } from "./config/db";
import budgetRouter from "./routes/budgetRouter";
import authRouter from "./routes/authRouter";

export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.blue.bold("Successful connection to DB")); // TODO: remove before prod
  } catch (_error) {
    console.log(colors.red.bold("Failed connection to DB"));
  }
}
connectDB();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/budgets", budgetRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("All fine");
});

export default app;
