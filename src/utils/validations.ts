import { z } from 'zod';

/**
 * ----------------- SIGN IN SCHEMA -----------------
 */

export const loginSchema = z.object({
  email: z
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * ----------------- SIGN UP SCHEMA -----------------
 */
export const signUpSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .extend(loginSchema.shape)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;