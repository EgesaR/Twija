// hooks/useTours.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api.client';
import type { Tour } from '@/types/tour';

export const useTours = () => {
  return useQuery({
    queryKey: ['tours'],
    queryFn: async (): Promise<Tour[]> => {
      // Fetching from FastAPI instead of Supabase client
      return await apiClient<Tour[]>('/tours');
    },
  });
};
