import { JWT_EXPIRES, JWT_SECRET } from './../config/index';
import jwt from 'jsonwebtoken';

export type Role = 'USER' | 'ADMIN';

const JWT_ISSUER = 'stackskills';
const JWT_AUDIENCE = 'stackskills';

// payload in the token, what should be exists
export interface TokenPayload {
  id: string;
  phone: string;
  role: Role;
  iat?: number;
  exp?: number;
  name: string;
}

if (!JWT_SECRET) {
  throw new Error('Missing env var JWT - required for authentication');
}

// token creation options
const signOptions: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: JWT_EXPIRES,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE,
};

// token checking options
const verifyOptions: jwt.VerifyOptions = {
  algorithms: ['HS256'],
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE,
};

/**
 * Creating the jsonwebtoken
 * @param payload - creation of payload that exists in token
 * @returns - JWT Token
 */

export function createAccessToken(payload: {
  id: string;
  phone: string;
  role: Role;
  name: string;
}): string {
  const tokenPayload: TokenPayload = {
    id: payload.id,
    phone: payload.phone,
    role: payload.role,
    name: payload.name,
  };
  return jwt.sign(tokenPayload, JWT_SECRET, signOptions);
}

/**
 * Verifying the token
 * @param token - get the token and verify it
 * @returns - verified token result
 */

export function verifyToken(token: string): TokenPayload {
  const decode = jwt.verify(token, JWT_SECRET, verifyOptions) as TokenPayload;
  return decode;
}
