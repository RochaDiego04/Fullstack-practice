import "dotenv/config";
import express from "express";
import router from "./router";
import { connectDB } from "./config/db";

const app = express();

connectDB();

app.use(express.json());

app.use("/", router); // here we should add '/api' or '/v1' if required

export default app;
