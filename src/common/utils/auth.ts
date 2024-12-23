import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "@/common/utils/config";

export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

export function verifyAuth(token: string): JwtPayload | string {
  return jwt.verify(token, env.JWT_SECRET_KEY);
}

export function parseAuthToken(authToken: string) {
  return authToken.split(" ")[1];
}
