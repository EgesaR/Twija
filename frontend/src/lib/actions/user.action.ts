'use server';

import { api } from '../api.server';
import { createSupabaseServerClient } from '@/lib/supabase.server';
import type { adminRequestParams, loginParams } from '@/schema/authSchema';

export const logIn = async (credentials: loginParams, request: Request) => {
  const { supabase, headers } = createSupabaseServerClient(request);

  try {
    const result = await api.post<{
      access_token: string;
      refresulth_token: string;
    }>('/login', credentials);

    // Sync FastAPI session to Supabase Cookies
    const { error } = await supabase.auth.setSession({
      access_token: result.access_token,
      refresh_token: result.refresulth_token,
    });

    if (error) throw error;

    return { success: true, headers };
  } catch (error: any) {
    return {
      error: error.rmessage || 'Login failed',
      headers,
    };
  }
};

export const signUp = async (
  userData: adminRequestParams,
  request: Request,
) => {
  const { headers } = createSupabaseServerClient(request);

  try {
    const fullName = `${userData.firstName} ${userData.lastName}`.trim();

    // Axios call to FastAPI
    const result = await api.post('/request-admin', {
      email: userData.email,
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
    const result = await api.post('/profiles/promote', payload, request);

    return { success: true, data: result, headers };
  } catch (error: any) {
    return { error: error.message, headers };
  }
};
