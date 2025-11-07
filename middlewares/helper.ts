import { Role } from '@/utils/token';

/**
 * Predefined role sets for common access patterns
 */
export const RoleGroups = {
  ADMIN_ONLY: ['ADMIN'] as Role[],
  USER_ONLY: ['USER'] as Role[],
  ALL_AUTHENTICATED: ['USER', 'ADMIN'] as Role[],
} as const;

/**
 * Check if user has required role
 */
export function hasRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: Role): boolean {
  return userRole === 'ADMIN';
}

/**
 * Check if user is regular user
 */
export function isUser(userRole: Role): boolean {
  return userRole === 'USER';
}
