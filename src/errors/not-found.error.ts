import { BaseError } from "@/errors/base.error";

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(
      {
        message: message ?? "Not found!",
        errorType: "NOT_FOUND",
      },
      { code: 404 },
    );
  }
}
