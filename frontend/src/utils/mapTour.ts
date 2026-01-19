// utils/mapTour.ts
import type { Tour } from '@/types/tour';
import type { tourProps } from '@/constants';

export function mapTourToTour(tour: tourProps): Tour {
  return {
    id: tour.id,
    name: tour.name,
    description: tour.description,
    startingPoint: tour.startingPoint,
    duration: tour.duration,
    estimated: tour.estimated,
    adventureSteps: tour.adventureSteps,
    price: tour.price,
    images: Array.isArray(tour.imgUrl) ? tour.imgUrl : [tour.imgUrl],
    type: tour.type,
    numberPerPerson: tour.numberPerPerson,
    slots: tour.slots,
    highlights: tour.adventureSteps,
  };
}
