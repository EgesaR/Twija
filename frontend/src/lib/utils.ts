import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// For initial request fo admin
export const adminRequestSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  email: z.string().email('Invalid email address'),
})

// For login
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// For Email Invitation Link
export const finishSetupSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type adminRequestParams = z.infer<typeof adminRequestSchema>
export type loginParams = z.infer<typeof loginSchema>
export type finishSetupParams = z.infer<typeof finishSetupSchema>