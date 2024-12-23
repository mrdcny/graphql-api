import bcrypt from "bcrypt";

export async function hash(password: string) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function validateHash(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
