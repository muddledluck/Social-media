import type mongoose from "mongoose";
import { type FilterQuery } from "mongoose";
import { UserModel } from "../../models";
import { type User, type UserDocument } from "../../models/user";

export class UserService {
  public async findById(id: mongoose.Schema.Types.ObjectId | string) {
    const user = await UserModel.findById(id);
    return user;
  }

  public async findOneWithOptions(options: FilterQuery<UserDocument>) {
    const user = await UserModel.findOne(options);
    return user;
  }

  public async create(user: User) {
    const newUser = await UserModel.create(user);
    return newUser;
  }
}
