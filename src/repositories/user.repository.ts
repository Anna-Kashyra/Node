import { IUser, IUserDto } from "../models/IUser";
import { readUsersFromFile, writeUsersToFile } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await readUsersFromFile();
  }

  public async create(dto: IUserDto): Promise<IUser> {
    const users = await readUsersFromFile();
    const newUser = {
      id: users.length + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await writeUsersToFile(users);
    return newUser;
  }

  public async getById(userId: number): Promise<IUser> {
    const users = await readUsersFromFile();
    return users.find((user) => user.id === userId);
  }

  public async deleteById(userId: number): Promise<void> {
    let users = await readUsersFromFile();
    users = users.filter((user) => user.id !== userId);
    await writeUsersToFile(users);
  }

  public async updateById(userId: number, dto: IUserDto): Promise<IUser> {
    const users = await readUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === userId);
    users[userIndex] = {
      id: userId,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    await writeUsersToFile(users);
    return users[userIndex];
  }

  public async partialUpdateById(
    userId: number,
    dto: Partial<IUserDto>,
  ): Promise<IUser | null> {
    const users = await readUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === userId);
    const user = users[userIndex];
    users[userIndex] = {
      ...user,
      ...dto,
    };
    await writeUsersToFile(users);
    return users[userIndex];
  }
}

export const userRepository = new UserRepository();
