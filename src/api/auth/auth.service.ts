import { StatusCodes } from "http-status-codes";
import { GraphQLError } from "graphql";

import { userService } from "@/api/users/user.service";

import { parseAuthToken, verifyAuth } from "@/common/utils/auth";

import type { JwtPayload } from "jsonwebtoken";

class AuthService {
  authenticate(token: string) {
    try {
      const accessToken: string = parseAuthToken(token);
      if (!accessToken) {
        throw new GraphQLError("Unauthorized access to API. Please supply a valid token", {
          extensions: { code: StatusCodes.UNAUTHORIZED },
        });
      }
      verifyAuth(accessToken);
    } catch (error) {
      throw new GraphQLError("Unauthorized access to API. Please supply a valid token", {
        extensions: { code: StatusCodes.UNAUTHORIZED },
      });
    }
  }
}

export const authService = new AuthService();
