export type TourType = 'Open Trip' | 'Private Trip';

export type Tour = {
  id: string;
  title: string;
  category: string;
  description: string;
  startingPoint: string;
  duration: string | null;
  estimated?: boolean;
  adventureSteps?: string[];
  price: number;
  images: string[] | null;
  type: TourType;
  numberPerPerson: number;
  slots: number;
  highlights?: string[];
  link: string;
};

export type TourPreview = Pick<Tour, 'id' | 'title' | 'images'>;

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
