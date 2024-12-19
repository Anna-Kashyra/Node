import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.use("/users", userRouter);

//Викликається для всіх маршрутів (*) у разі виникнення помилки
app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message ?? "Something went wrong";

    res.status(status).json({ status, message });
  },
);

//Відловлює помилки, які не були оброблені через try...catch або next
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

app.listen(config.port, async () => {
  await mongoose.connect(config.mongoUrl);
  console.log(`Server has been started on port ${config.port}`);
});
