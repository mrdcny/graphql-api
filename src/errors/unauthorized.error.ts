import { BaseError } from "@/errors/base.error";

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(
      {
        message: message ?? "Unauthorized. You are not allowed to perform this actions",
        errorType: "UNAUTHORIZED",
      },
      { code: 401 },
    );
  }
}
