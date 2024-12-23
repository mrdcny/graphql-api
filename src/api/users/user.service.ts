import { bcrypt, auth } from "@/utils/index";
import { userRepository } from "@/api/users/user.repository";

import type { IUser, UserResponse } from "@/api/users/types";
import { InternalServerError, NotFoundError, UnauthorizedError } from "@/errors";

class UserService {
  async login(email: string, password: string): Promise<UserResponse> {
    const existingUser: IUser | null = await userRepository.findByEmail(email);
    if (!existingUser) throw new NotFoundError(`User: ${email} not found`);

    const isPasswordMatching = await bcrypt.validateHash(password, existingUser.password);
    if (!isPasswordMatching) throw new UnauthorizedError("Invalid email or password.");

    const accessToken: string = auth.generateAccessToken(email);
    return { email, accessToken };
  }

  async register(email: string, password: string): Promise<UserResponse> {
    const userExists: IUser | null = await userRepository.findByEmail(email);
    if (userExists) throw new InternalServerError(`User: ${email} already used. Please choose a different email.`);

    const encryptedPassword: string = await bcrypt.hash(password);
    const newUser: IUser = await userRepository.save({ email, password: encryptedPassword });
    const accessToken: string = auth.generateAccessToken(newUser.email);

    return { email, accessToken };
  }
}

export const userService = new UserService();
