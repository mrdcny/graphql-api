export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length > 0;
}
