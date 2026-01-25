// lib/supabase.client.ts
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      'Missing Supabase Environment Variables. Check your .env file.',
    );
    throw new Error('Supabase configuration is incomplete.');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// For compatibility with your existing code, you can export a singleton if needed
export const supabase = createClient();
