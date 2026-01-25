const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
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
