'use server';

import { api } from '../api/api.server';
import { createSupabaseServerClient } from '@/lib/supabase/supabase.server';
import type { AdminRequestParams, LoginParams } from '@/schema/authSchema';

export const logIn = async (credentials: LoginParams, request: Request) => {
  const { supabase, headers } = createSupabaseServerClient(request);

  try {
    const result = await api.post<{
      access_token: string;
      refresh_token: string;
    }>('/admin/login', credentials, {}, request);

    // Sync FastAPI session to Supabase Cookies
    const { error } = await supabase.auth.setSession({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    });

    if (error) throw error;

    return { success: true, headers };
  } catch (error: any) {
    console.error('Login Action Error:', error);
    return {
      error: error.message || 'Login failed',
      headers,
    };
  }
};

export const signUp = async (
  userData: AdminRequestParams,
  request: Request,
) => {
  const { headers } = createSupabaseServerClient(request);
  const { email, firstName, lastName} = userData
  try {
    const fullName = `${firstName} ${lastName}`.trim();

    // Axios call to FastAPI
    const result = await api.post('/admin/request-admin', {
      email: email,
      full_name: fullName,
    });

    return {
      success: true,
      data: result,
      headers, // Return headers to persist cookies
    };
  } catch (error: any) {
    return {
      error: error.message || 'Could not submit admin request',
      headers,
    };
  }
};

export const promoteToAdmin = async (payload: any, request: Request) => {
  const { headers } = createSupabaseServerClient(request);

  try {
    const result = await api.post('/admin/profiles/promote', payload, request);

    return { success: true, data: result, headers };
  } catch (error: any) {
    return { error: error.message, headers };
  }
};

export const logOut = async (request: Request) => {
  const { supabase, headers } = createSupabaseServerClient(request);

  try {
    // 1. Tell FastAPI to sign out (invalidates session on server)
    await api.post('/admin/logout', {}, {}, request);

    // 2. Clear Supabase Auth session in the browser cookies
    await supabase.auth.signOut();

    return { success: true, headers };
  } catch (error: any) {
    console.error('Logout Error:', error.message);
    // Even if API fails, we return headers to try and clear local cookies
    return { success: false, headers };
  }
};
