import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "@/config/environment";
import { UnauthorizedError } from "@/errors";

export function generateAccessToken(user: string): string {
  return jwt.sign({ sub: user }, env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

export function verifyAuth(token: string): JwtPayload | string {
  try {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  } catch (error) {
    throw new UnauthorizedError((error as Error).message);
  }
}

export function parseAuthToken(authToken: string) {
  return authToken.split(" ")[1];
}

export function validateAuthentication(token: string) {
  const accessToken: string = parseAuthToken(token);
  if (!accessToken) {
    throw new UnauthorizedError();
  }
  verifyAuth(accessToken);
}
