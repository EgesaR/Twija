export type TourType = 'Open Trip' | 'Private Trip';

export type Tour = {
  id: string;
  name: string;
  description: string;
  startingPoint: string;
  duration: string;
  estimated?: boolean;
  adventureSteps?: string[];
  price: number;
  images: string[];
  type: TourType;
  numberPerPerson: number;
  slots: number;
  highlights?: string[];
};

export type TourPreview = Pick<Tour, 'id' | 'name' | 'images'>;

export type TourFilter = {
  type?: TourType;
  maxPrice?: number;
  minDuration?: string;
  maxDuration?: string;
};

export type TourSortOption =
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'duration-desc';
