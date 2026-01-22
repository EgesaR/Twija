import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type !== 'login' ? z.string().optional() : z.string().min(3),
    lastName: type !== 'login' ? z.string().optional() : z.string().min(3),
    adminId: type !== 'login' ? z.string().optional() : z.string().min(20),

    // both
    email: z.email(),
    password: z.string().min(8),
  });
