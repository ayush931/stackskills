import { PASSWORD_PEPPER } from '@/config';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const SALT_ROUNDS = 15;
const MAX_PASSWORD_LENGTH = 128;
const MIN_PASSWORD_LENGTH = 8;

interface PasswordStrength {
  isValid: boolean;
  score: number;
  feedback: string[];
}

/**
 * Checking the strength of user password
 * @param password - Taking the password from the user
 * @returns - Returning that password has strength or not with score
 */

export const validatePasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length < MIN_PASSWORD_LENGTH) {
    feedback.push(`Password must have atleast ${MIN_PASSWORD_LENGTH} character long`);
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain atleast one lowercase letter');
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain atleast one uppercase letter');
  } else {
    score += 1;
  }

  if (!/\d/.test(password)) {
    feedback.push('Password must contain atleast one number');
  } else {
    score += 1;
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Password must contain at least one special character');
  } else {
    score += 1;
  }

  const commonPatterns = [/(.)\1{2,}/, /123456|654321|abcdef|qwerty|password|admin/i];

  commonPatterns.forEach((pattern) => {
    if (pattern.test(password)) {
      feedback.push('Password contains common patterns and its easily gueesable');
      score -= 2;
    }
  });

  const isValid = feedback.length === 0 && score >= 4;

  return {
    isValid,
    score: Math.max(0, score),
    feedback,
  };
};

/**
 * Hash a plain text password
 * @param password - The plain text password to hash
 * @param saltRounds - Number of salt rounds (default: 10)
 * @returns Hash password
 */

export const hashPassowrd = async (
  userPassword: string
): Promise<{
  success: boolean;
  hash?: string;
  error?: string;
}> => {
  try {
    if (!userPassword || typeof userPassword !== 'string') {
      await new Promise((resolve) => setTimeout(resolve, crypto.randomInt(100, 500)));
      return {
        success: false,
        error: 'Password is required and must be in a string',
      };
    }

    if (userPassword.length > MAX_PASSWORD_LENGTH) {
      return {
        success: false,
        error: `Password exceeds the maximum length of ${MAX_PASSWORD_LENGTH} character`,
      };
    }

    const strengthCheck = validatePasswordStrength(userPassword);

    if (!strengthCheck.isValid) {
      return {
        success: false,
        error: `Password is too weak: ${strengthCheck.feedback.join(', ')}`,
      };
    }

    const pepper = PASSWORD_PEPPER || 'default-password-pepper';
    const pepperPassword = userPassword + pepper;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(pepperPassword, salt);

    await new Promise((resolve) => setTimeout(resolve, crypto.randomInt(100, 500)));

    return {
      success: true,
      hash: hashedPassword,
    };
  } catch (error) {
    console.error('Error in hashing password', error);
    await new Promise((resolve) => setTimeout(resolve, crypto.randomInt(100, 500)));
    return {
      success: false,
      error: String(error),
    };
  }
};

/**
 *  Verify the user and database password
 * @param userPassword - Take the password from the user
 * @param dbPassword - Take the password from the database
 * @returns - Returns boolean (success or failed) to verify password
 */

export const verifyPassword = async (
  userPassword: string,
  dbPassword: string
): Promise<{
  success: boolean;
  isMatch?: boolean;
  error?: string;
}> => {
  try {
    if (
      !userPassword ||
      !dbPassword ||
      typeof userPassword !== 'string' ||
      typeof dbPassword !== 'string'
    ) {
      await new Promise((resolve) => setTimeout(resolve, crypto.randomInt(100, 500)));
      return {
        success: false,
        error: 'Invalid input parameter',
      };
    }

    if (userPassword.length > MAX_PASSWORD_LENGTH) {
      return {
        success: false,
        error: `User password cannot exceed more than ${MAX_PASSWORD_LENGTH} characters`,
      };
    }

    const pepper = PASSWORD_PEPPER;
    const pepperPassword = userPassword + pepper;

    const isMatch = await bcrypt.compare(pepperPassword, dbPassword);

    return {
      success: true,
      isMatch,
    };
  } catch (error) {
    console.error('Error in verify password', error);
    return {
      success: false,
      error: String(error),
    };
  }
};
