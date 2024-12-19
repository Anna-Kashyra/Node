import { IUser, IUserCreateDto, IUserUpdateDto } from "../interfaces/IUser";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  public async updateById(userId: string, dto: IUserUpdateDto): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
}

export const userRepository = new UserRepository();
