import { FilterQuery } from "mongoose";
import { UserModel } from "../../models";
import { User, UserDocument } from "../../models/user.template";

export class UserService {
  public async findById(id: string) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (err: any) {
      throw err;
    }
  }
  public async findOneWithOptions(options: FilterQuery<UserDocument>) {
    try {
      const user = await UserModel.findOne(options);
      return user;
    } catch (err: any) {
      throw err;
    }
  }
  public async create(user: User) {
    try {
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (err: any) {
      throw err;
    }
  }
}
