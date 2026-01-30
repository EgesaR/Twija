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
    return redirect('/admin/dashboard', {
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

export default function LoginRoute() {
  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get('error');
  const error: 'not_admin' | 'no_session' | null =
    errorParam === 'not_admin' || errorParam === 'no_session'
      ? errorParam
      : null;

  return (
    <main className='h-screen w-full relative'>
      <div className='w-full absolute top-0 py-4 flex items-center justify-end px-4'>
        {error === 'not_admin' && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200'>
            Access Denied: You are not authorized as an Admin.
          </div>
        )}
        {error === 'no_session' && (
          <div className='mb-4 p-3 bg-blue-100 text-blue-700 rounded-md border border-blue-200'>
            Please log in to access the dashboard.
          </div>
        )}
      </div>
      <AuthForm type='login' />
    </main>
  );
}
