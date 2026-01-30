import { supabaseStorageKey } from '@/constants';
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

export const createSupabaseServerClient = (request: Request) => {
  const headers = new Headers();

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey =
    process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // This console error will show up in your terminal, not the browser
    console.error('CRITICAL: Supabase keys missing in server context');
    throw new Error('Server configuration error');
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storageKey: supabaseStorageKey,
      //autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get('Cookie') ?? '';
        const parsed = parseCookieHeader(cookieHeader);

        // Fix: Filter out undefined values to match { name: string; value: string }[]
        return parsed
          .filter((cookie) => cookie.value !== undefined)
          .map((cookie) => ({
            name: cookie.name,
            value: cookie.value as string,
          }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            'Set-Cookie',
            serializeCookieHeader(name, value, options),
          ),
        );
      },
    },
  });

  return { supabase, headers };
};
