import type { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'editor' | 'user' | null;

export const isAdmin = (user: User | null, role: UserRole): boolean =>
  !!user && role === 'admin';

export const canEditContent = (role: UserRole): boolean =>
  role === 'admin' || role === 'editor';
