import type { Tour } from "./tour";

export type NewTour = Omit<Tour, 'id' | 'images'> & { images: File[] };
export type UpdateTour = Partial<Omit<Tour, 'id' | 'images'>> & {
  images?: File[];
};
