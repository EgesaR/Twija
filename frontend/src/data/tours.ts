import { rawTours } from './rawTours';
import { mapTourToTour } from '@/utils/mapTour';
import type { Tour } from '@/types/tour';

export const tours: Tour[] = rawTours.map(mapTourToTour);
console.log("Tours:",tours);
