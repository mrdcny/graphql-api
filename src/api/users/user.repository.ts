import User from "@/api/users/user.model";
import type { IUser } from "@/api/users/types";

class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async save(data: IUser): Promise<IUser> {
    return await User.create(data);
  }
}

export const userRepository = new UserRepository();
