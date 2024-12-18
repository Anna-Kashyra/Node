import fs from "fs/promises";
import path from "path";

import { IUser } from "../models/IUser";

const usersFilePath = path.join(process.cwd(), "db", "users.json");

export const readUsersFromFile = async (): Promise<IUser[]> => {
  const data = await fs.readFile(usersFilePath, "utf-8");
  return JSON.parse(data);
};

export const writeUsersToFile = async (users: IUser[]): Promise<void> => {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};
