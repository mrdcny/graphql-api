import { BaseError } from "@/errors/base.error";

export class InternalServerError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(
      {
        message: message,
        errorType: "INTERNAL_SERVER_ERROR",
      },
      { code: 500, stackTrace },
    );
  }
}
