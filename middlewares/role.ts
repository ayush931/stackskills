import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, type Role, type TokenPayload } from '@/utils/token';

interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload;
}

/**
 * Middleware to verify authentication and check user roles
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @returns Middleware function
 */
export function withRoleAuth(allowedRoles: Role[]) {
  return async (req: AuthenticatedRequest) => {
    try {
      // Get token from cookies
      const token = req.cookies.get('token')?.value;

      if (!token) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }

      // Verify token
      let decoded: TokenPayload;
      try {
        decoded = verifyToken(token);
      } catch (error) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized - Invalid token' },
          { status: 401 }
        );
      }

      // Check if user role is allowed
      if (!allowedRoles.includes(decoded.role)) {
        return NextResponse.json(
          {
            success: false,
            message: `Forbidden - ${decoded.role} role does not have access to this resource`,
          },
          { status: 403 }
        );
      }

      // Attach user info to request
      req.user = decoded;

      // Return null to continue with the request
      return null;
    } catch (error) {
      console.error('Error in role auth middleware:', error);
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Extract user from authenticated request
 */
export function getUserFromRequest(req: NextRequest): TokenPayload | null {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
