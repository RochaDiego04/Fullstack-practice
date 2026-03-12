import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

connectDB();

const app = express();

// CORS
app.use(cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

app.use("/", router); // here we should add '/api' or '/v1' if required

export default app;
