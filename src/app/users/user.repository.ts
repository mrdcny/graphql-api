import User from "@/app/users/entities/user.model";
import type { IUser } from "@/app/users/interfaces/types";

class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async save(data: IUser): Promise<IUser> {
    return await User.create(data);
  }
}
export default UserRepository;
