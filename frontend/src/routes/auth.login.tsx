import {
  data,
  redirect,
  useSearchParams,
  type ActionFunctionArgs,
  type MetaFunction,
} from 'react-router';
import { loginSchema } from '@/schema/authSchema';
import { logIn } from '@/lib/actions/user.action.server';
import AuthForm from '@/components/auth/AuthForm';
import type { Route } from './+types/auth.login';
import { create } from 'domain';
import { createSupabaseServerClient } from '@/lib/supabase/supabase.server';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// 1. Professional SEO & Browser Tab Title
export const meta: MetaFunction = () => {
  return [
    { title: 'Admin Login | Your Brand' },
    { name: 'description', content: 'Access the administrative dashboard.' },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  // // 2. Schema Validation
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return data(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    // 3. Server Action Call
    const result = await logIn(parsed.data, request);

    if (result.error) {
      // Pass headers even on error in case they contain cookie-clearing instructions
      return data(
        { error: result.error },
        { status: 401, headers: result.headers },
      );
    }

    // 4. Success Redirect
    return redirect('/admin/dashboard?login=success', {
      headers: result.headers,
    });
  } catch (error) {
    // Fallback for unexpected system failures (Database down, etc.)
    return data(
      { error: 'A system error occurred. Please try again later.' },
      { status: 500 },
    );
  }
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { supabase } = createSupabaseServerClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    // Only auto-redirect if they are actually authorized
    if (roleData?.role === 'admin') {
      throw redirect('/admin/dashboard');
    }
  }
  return {};
};

const LoginRoute = () => {
  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get('error');
  const error: 'not_admin' | 'no_session' | null =
    errorParam === 'not_admin' || errorParam === 'no_session'
      ? errorParam
      : null;

  useEffect(() => {
    if (errorParam === 'not_admin')
      toast({
        title: 'Access Denied',
        description: 'You are not authorized as an Admin.',
        variant: 'destructive',
      });
    else if (errorParam === 'no_session')
      toast({
        title: 'Please log in',
        description: 'You must be logged in to access the dashboard.',
        variant: 'info',
      });
  }, [errorParam]);

  return (
    <main className='h-screen w-full'>
      <AuthForm type='login' />
    </main>
  );
};

export default LoginRoute;
