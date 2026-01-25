// app/routes/admin.login.tsx
import { data, redirect, type ActionFunctionArgs } from 'react-router';
import { loginSchema } from '@/lib/utils';
import { logIn } from '@/lib/actions/user.action';
import AuthForm from '@/components/AuthForm';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  // 1. Validate using the Login Schema (email/password)
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return data(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // 2. Call the logIn server action
  // This function (in user.action.ts) calls FastAPI and sets the Supabase session
  const result = await logIn(parsed.data, request);

  if (result.error) {
    return data(
      { error: result.error },
      { status: 401, headers: result.headers },
    );
  }

  // 3. Success! Redirect to dashboard.
  // IMPORTANT: Pass result.headers so the cookies actually get saved in the browser.
  return redirect('/admin/dashboard', {
    headers: result.headers,
  });
};

export default function LoginRoute() {
  return <AuthForm type='login' />;
}
