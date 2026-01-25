// lib/supabase.server.ts
import {
  createServerClient as cSC,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

export const createSupabaseServerClient = (request: Request) => {
  const headers = new Headers();

  const supabase = cSC(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get('Cookie') ?? '',
          );
          // Fix: Ensure value is never undefined to satisfy Supabase types
          return cookies.map((c) => ({ name: c.name, value: c.value ?? '' }));
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
    },
  );

  return { supabase, headers };
};
