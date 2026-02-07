import express from "express";
import router from "./router";

const app = express();

app.use("/", router); // here we should add '/api' or '/v1' if required

export default app;
