// utils/mapTour.ts
import type { Tour } from '@/types/tour';
import type { tourProps } from '@/constants';

export function mapTourToTour(tour: tourProps): Tour {
  return {
    id: tour.id,
    title: tour.title, // Fixed: was tour.name
    description: tour.description,
    startingPoint: tour.startingPoint,
    duration: tour.duration,
    estimated: tour.estimated,
    adventureSteps: tour.adventureSteps,
    price: tour.price,
    images: Array.isArray(tour.imgUrl) ? tour.imgUrl : [tour.imgUrl],
    type: tour.type as any, // Cast to TourType
    numberPerPerson: tour.numberPerPerson,
    slots: tour.slots,
    highlights: tour.adventureSteps,
    // Provide defaults for missing mandatory fields in the Type
    category: 'General',
    link: `#${tour.id}`,
  };
}
