import api from '@/lib/api.client';
import { useQuery } from '@tanstack/react-query';

export const usePendingRequest = () => {
  return useQuery({
    queryKey: ['admin-requests', 'pending'],
    queryFn: async () => {
      const { data } = await api.get('/admin/requests');
      return data.data;
    },
  });
};
