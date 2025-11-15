/**
 * Various configuration getting from .env file
 */

export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES = process.env.JWT_EXPIRES as unknown as number;
export const PASSWORD_PEPPER = process.env.PASSWORD_PEPPER as string;
export const REDIS_URL = process.env.REDIS_URL as string;

// Runtime validation for critical secrets
if (!PASSWORD_PEPPER && process.env.NODE_ENV === 'production') {
  console.warn(
    'WARNING: PASSWORD_PEPPER is not set in production environment. Using default value is insecure!'
  );
}
