import bcrypt from 'bcrypt';

/**
 * Hash a plain text password
 * @param password - The plain text password to hash
 * @param saltRounds - Number of salt rounds (default: 10)
 * @returns Hash password
 */

export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

/**
 *
 * @param password - Plain text password to verify
 * @param hashedPassword - The hashed password to compare again
 * @returns - True if password matches, false otherwise
 */

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
