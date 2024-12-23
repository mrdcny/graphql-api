import { BaseError } from "@/errors/base.error";

export class BadDataError extends BaseError {
  constructor(message: string) {
    super(
      {
        message: message ?? "Invalid payload provided.",
        errorType: "BAD_DATA",
      },
      { code: 422 },
    );
  }
}
