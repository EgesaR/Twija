import { redirect, type ActionFunctionArgs } from 'react-router';
import { logOut } from '@/lib/actions/user.action.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { headers } = await logOut(request);

  // Redirect to login while passing the headers that clear the cookies
  return redirect('/auth/login', {
    headers,
  });
};

// Optional: Redirect if someone tries to GET this route
export const loader = () => redirect('/auth/login');
