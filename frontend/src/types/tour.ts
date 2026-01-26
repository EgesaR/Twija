export type KigaliDistrict =
  | 'Nyarugenge'
  | 'Gasabo'
  | 'Kicukiro'
  | 'Nyamirambo'
  | 'City Center'
  | 'Kimihurura';

export type TourType = 'Group' | 'Private' | 'Custom';

export type TourCategory =
  | 'Genocide Memorial & Historical'
  | 'Art & Culture'
  | 'Urban Exploration'
  | 'Culinary & Food'
  | 'Nature & Hiking';

export type RecommendationLevel =
  | 'Best Seller'
  | 'Top Rated'
  | 'Eco-Friendly'
  | 'Hidden Gem'
  | 'Luxury Choice';

export interface Tour {
  // 1. Basic Info
  id: string;
  title: string;
  category: TourCategory;
  description: string;
  link: string;
  images: string[];

  // 2. Location (Standardized)
  location: {
    country: 'Rwanda';
    city: 'Kigali';
    district: KigaliDistrict;
    startingPoint: string;
  };

  // 3. Logistics & Booking
  type: TourType;
  duration: {
    value: number;
    unit: 'hours' | 'days';
  };
  price: {
    amount: number;
    currency: 'RWF' | 'USD';
  };
  availability: {
    totalSlots: number;
    remainingSlots: number;
    minParticipants: number;
  };

  // 4. Experience Details
  highlights: string[];
  adventureSteps: string[];
  difficulty: 'Easy' | 'Moderate' | 'Strenuous';
  languages: ('English' | 'Kinyarwanda' | 'French' | 'Swahili')[];

  // 5. Trust & Assurance (The "Recommendable" section)
  assurance: {
    rating: number; // e.g., 4.8
    reviewCount: number;
    recommendationTag?: RecommendationLevel;
    isVerified: boolean; // Extra layer of trust
  };

  // 6. Metadata
  created_at: string;
  updated_at: string;
}

export type TourPreview = Pick<Tour, 'id' | 'title' | 'images' | 'category'> & {
  rating: number;
  recommendationTag?: RecommendationLevel;
  priceAmount: number;
  currency: 'RWF' | 'USD';
  district: KigaliDistrict;
};

export type TourFilters = {
  type?: TourType;
  district?: KigaliDistrict;
  category?: TourCategory;
  maxPrice?: number;
  minPrice?: number;
  maxDurationHours?: number;
  language?: 'English' | 'Kinyarwanda' | 'French' | 'Swahili';
limit?: number;
};

export type TourSortOption =
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'rating-asc'
  | 'duration-asc'
  | 'duration-desc'
  | 'newest';
