import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api.client';
import type { Tour } from '@/types/tour';

export const useTourById = (tourId: string | undefined, options = {}) => {
  return useQuery({
    queryKey: ['tour', tourId],
    queryFn: () => apiClient<Tour>(`/tours/${tourId}/`),
    enabled: !!tourId,
    retry: 1,
    ...options,
  });
};
