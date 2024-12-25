import { userService } from "@/app/users/user.service";

import type { CreateUserDto } from "@/app/users/dto/create-user.dto";
import type { LoginUserDto } from "@/app/users/dto/login-user.dto";
import type { IUserResponse } from "@/app/users/interfaces/types";
import { validateInput } from "@/utils/validator";

const userResolver = {
  async login(user: LoginUserDto): Promise<IUserResponse> {
    const { email, password } = user;
    validateInput(email, password);

    return await userService.login(user);
  },

  async register(user: CreateUserDto): Promise<IUserResponse> {
    const { email, password } = user;
    validateInput(email, password);

    return await userService.register(user);
  },
};

export default userResolver;
