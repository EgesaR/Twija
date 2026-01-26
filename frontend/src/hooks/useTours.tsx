// hooks/useTours.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api.client';
import type { Tour, TourFilters } from '@/types/tour';
import { mapTourToTour } from '@/utils/mapTour';
import { tours as fallbackTours } from '@/data/tours';

export const useTours = (filters?: TourFilters) => {
  return useQuery({
    queryKey: ['tours', filters],
    queryFn: async (): Promise<Tour[]> => {
      try {
        const data = await apiClient<any[]>("/tours")

        if (!data || data.length === 0) throw new Error("No data")
        
        return data.map(mapTourToTour)
      } catch (error) {
        console.info("API Offline: Serving local rawTours fallback")
        return fallbackTours
      }
    },

    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
