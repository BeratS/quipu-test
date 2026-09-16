import { z } from 'zod';

/**
 * ----------------- SIGN IN SCHEMA -----------------
 */

export const signInSchema = z.object({
  email: z
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

/**
 * ----------------- SIGN UP SCHEMA -----------------
 */
export const signUpSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .extend(signInSchema.shape)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * ----------------- CREATE SLOT MEETING SCHEMA -----------------
 */
export const createSlotMeetingSchema = z.object({
  title: z
    .string()
    .min(1, 'Meeting title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.date({
    error: 'Please select a date',
  }),
  hour: z.string({
    error: 'Please select a time slot',
  }).min(1, 'Time slot is required'),
});

export type CreateSlotMeetingFormData = z.infer<typeof createSlotMeetingSchema>;