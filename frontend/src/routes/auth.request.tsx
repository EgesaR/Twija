// app/routes/admin.signup.tsx
import { data, type ActionFunctionArgs } from 'react-router';
import { adminRequestSchema } from '@/schema/authSchema';
import { signUp } from '@/lib/actions/user.action.server';
import AuthForm from '@/components/auth/AuthForm';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  // Validate with Zod
  const parsed = adminRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return data(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Call the server action
  const result = await signUp(parsed.data, request);

  if (result.error) {
    return data(
      { error: result.error },
      { status: 400, headers: result.headers },
    );
  }

  return data(
    { success: true, data: result.data },
    { headers: result.headers },
  );
};

export default function SignupRoute() {
  return (
    <main className='h-screen w-full'>
      <AuthForm type='sign-up' />
    </main>
  );
}
