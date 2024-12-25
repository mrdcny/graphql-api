import { BadDataError, errorMessages } from "@/errors";

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length > 0;
}

export function validateInput(email: string, password: string) {
  if (!isValidEmail(email) || !isValidPassword(password))
    throw new BadDataError(errorMessages.INVALID_USER_INPUT);
}
