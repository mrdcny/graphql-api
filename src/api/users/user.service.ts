import { generateAccessToken } from "@/common/utils/auth";
import { hash, validateHash } from "@/common/utils/encrypt";

import { StatusCodes } from "http-status-codes";
import { GraphQLError } from "graphql";

import User from "@/api/users/user.model";
import type { IUser, UserResponse } from "@/api/users/types";

class UserService {
  async login(email: string, password: string): Promise<UserResponse> {
    try {
      const existingUser: IUser | null = await User.findOne({ email });

      if (!existingUser) throw new GraphQLError("User not found", { extensions: { code: StatusCodes.NOT_FOUND } });
      const isPasswordMatching = await validateHash(password, existingUser.password);

      if (!isPasswordMatching)
        throw new GraphQLError("Invalid Password. Please try again.", {
          extensions: { code: StatusCodes.UNAUTHORIZED },
        });

      const accessToken: string = generateAccessToken(email);
      return { email, accessToken };
    } catch (error) {
      const errorCode = (error as GraphQLError)?.extensions?.code || StatusCodes.INTERNAL_SERVER_ERROR;
      throw new GraphQLError((error as Error).message, { extensions: { code: errorCode } });
    }
  }

  async register(email: string, password: string): Promise<UserResponse> {
    try {
      const userExists: IUser | null = await User.findOne({ email });

      if (userExists) throw new GraphQLError(`Email ${email} already used. Please try again.`);

      const encryptedPassword: string = await hash(password);
      const newUser: IUser = await User.create({ email, password: encryptedPassword });

      const accessToken: string = generateAccessToken(newUser.email);

      return { email, accessToken };
    } catch (error) {
      const errorCode = (error as GraphQLError)?.extensions?.code || StatusCodes.INTERNAL_SERVER_ERROR;
      throw new GraphQLError((error as Error).message, { extensions: { code: errorCode } });
    }
  }
}

export const userService = new UserService();
