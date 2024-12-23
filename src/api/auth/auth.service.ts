import { StatusCodes } from "http-status-codes";
import { GraphQLError } from "graphql";

import { parseAuthToken, verifyAuth } from "@/common/utils/auth";

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
      /**
       * TODO: Possible to add user validation here
       */
    } catch (error) {
      throw new GraphQLError("Unauthorized access to API. Please supply a valid token", {
        extensions: { code: StatusCodes.UNAUTHORIZED },
      });
    }
  }
}

export const authService = new AuthService();
