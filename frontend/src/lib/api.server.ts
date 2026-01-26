import { createSupabaseServerClient } from './supabase.server';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const cleanedEndpoint = endpoint.replace(/^\//, '');
  const response = await fetch(`${API_URL}${cleanedEndpoint}/`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.detail || 'An error occurred on the client');
  }

  return data as T;
};

const apiServerRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  incomingRequest?: Request,
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  // --- AUTO-AUTH LOGIC ---
  if (incomingRequest) {
    const { supabase } = createSupabaseServerClient(incomingRequest);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  // Handle empty responses (like 204 No Content)
  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(
      data?.detail || `API Error: ${response.status} ${response.statusText}`,
    );
  }

  return data as T;
};

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiServerRequest(endpoint, options),
  post: <T>(endpoint: string, body: any, options?: RequestInit) =>
    apiServerRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  patch: <T>(endpoint: string, body: any, options?: RequestInit) =>
    apiServerRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiServerRequest<T>(endpoint, {
      ...options,
      method: 'DELETE',
    }),
};
