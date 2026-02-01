import { redirect } from 'react-router';
import { createSupabaseServerClient } from './supabase/supabase.server';
import { isAdmin } from './policies/auth-policies';

export async function requireAdmin(request: Request) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 1. No session? Kick to login
  if (!session) {
    throw redirect('/auth/login?error=no_session', { headers });
  }

  // 2. Fetch role from your 'user_roles' table
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single();

  // 3. Not an admin? Kick to login with specific error
  
  if (!isAdmin(session.user, roleData?.role)) {
    throw redirect('/auth/login?error=not_admin', { headers });
  }

  return { user: session.user, supabase, headers };
}
