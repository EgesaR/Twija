// lib/supabase.client.ts
import { supabaseStorageKey } from '@/constants';
import { createBrowserClient } from '@supabase/ssr';

const createClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      'Missing Supabase Environment Variables. Check your .env file.',
    );
    throw new Error('Supabase configuration is incomplete.');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storageKey: supabaseStorageKey,
      // autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

export default createClient