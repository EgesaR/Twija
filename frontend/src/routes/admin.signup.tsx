// app/routes/admin.signup.tsx
import { data, type ActionFunctionArgs } from 'react-router';
import { adminRequestSchema } from '@/lib/utils';
import { signUp } from '@/lib/actions/user.action';
import AuthForm from '@/components/AuthForm';

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
  return <AuthForm type='signup' />;
}
