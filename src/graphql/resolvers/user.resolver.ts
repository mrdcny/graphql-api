import { userService } from "@/api/users/user.service";
import type { IUser, UserResponse } from "@/api/users/types";
import { validateInput } from "@/utils/validator";

const userResolver = {
  async login(payload: IUser): Promise<UserResponse> {
    const { email, password } = payload;
    validateInput(email, password);

    return await userService.login(email, password);
  },

  async register(payload: IUser): Promise<UserResponse> {
    const { email, password } = payload;
    validateInput(email, password);

    return await userService.register(email, password);
  },
};

export default userResolver;
