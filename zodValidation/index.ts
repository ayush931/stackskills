import { z } from 'zod';

// Phone validation: exactly 10 digits (Indian format)
const phoneRegex = /^[6-9]\d{9}$/;

// Name validation: letters, spaces, hyphens, apostrophes (common in names)
const nameRegex = /^[a-zA-Z\s'-]+$/;

// Password validation: must contain uppercase, lowercase, number, and special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;

const nameSchema = z
  .string()
  .trim()
  .min(1, 'Name is required')
  .max(128, 'Name cannot exceed more than 128 characters')
  .regex(nameRegex, 'Name can only contain letters, spaces, hyphens, and apostrophes');

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, 'Phone number must contain only digits')
  .length(10, 'Phone number must be exactly 10 digits')
  .regex(phoneRegex, 'Phone number must start with 6, 7, 8, or 9');

const classNameSchema = z
  .string()
  .trim()
  .min(1, 'Class name is required')
  .max(128, 'Class name cannot exceed more than characters');

const schoolNameSchema = z
  .string()
  .trim()
  .min(1, 'School name is required')
  .max(500, 'School name cannot exceed more than 500 characters');

const passwordSchema = z
  .string()
  .trim()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password cannot exceed more than 128 characters')
  .regex(
    passwordRegex,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

const roleSchema = z.enum(['USER', 'ADMIN']).optional().default('USER');

export const registerUserSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  schoolName: schoolNameSchema,
  className: classNameSchema,
  password: passwordSchema,
  role: roleSchema,
});

export const loginUserSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
