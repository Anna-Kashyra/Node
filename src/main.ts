import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

//Завантаження  бібліотеки для змінних середовища з файлу .env.
dotenv.config();

const app = express();

//для автоматичного парсингу JSON із тіла запиту (req.body)
app.use(express.json());

//для парсингу URL-кодованих даних (наприклад, з HTML-форм).
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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
