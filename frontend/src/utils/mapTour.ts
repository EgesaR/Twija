// utils/mapTour.ts
import type {
  Tour,
  TourCategory,
  KigaliDistrict,
  RecommendationLevel,
} from '@/types/tour';

// 1. Safe Duration Parser
const parseDuration = (d: string | undefined) => {
  if (!d) return { value: 0, unit: 'hours' as const };

  const parts = d.split(' ');

  return {
    value: parseInt(parts[0] || '0') || 0, // Fallback handles 'undefined' error
    unit: (parts[1]?.toLowerCase().includes('day') ? 'days' : 'hours') as
      | 'days'
      | 'hours',
  };
};

// 2. Safe Category Inference (Added default strings to prevent errors)
const inferCategory = (title: string = '', desc: string = ''): TourCategory => {
  const text = (title + desc).toLowerCase();
  if (text.includes('memorial') || text.includes('history'))
    return 'Genocide Memorial & Historical';
  if (text.includes('art') || text.includes('women')) return 'Art & Culture';
  if (text.includes('food') || text.includes('coffee'))
    return 'Culinary & Food';
  if (text.includes('hike') || text.includes('nature') || text.includes('park'))
    return 'Nature & Hiking';
  return 'Urban Exploration';
};

export function mapTourToTour(raw: any): Tour {
  // Logic to determine the tag safely
  const images = Array.isArray(raw.images)
    ? raw.images
    : raw.image_url
      ? [raw.image_url]
      : raw.images
        ? [raw.images]
        : [];
  
  const getRecommendationTag = (price: number): RecommendationLevel => {
    return price > 100 ? 'Luxury Choice' : 'Top Rated';
  };

  return {
    id: raw.id,
    title: raw.title || raw.name || 'Untitled Tour', // Safety fallback
    description: raw.description || '',

    // Pass raw.title/description safely
    category:
      raw.category ||
      inferCategory(raw.title || raw.name || '', raw.description || ''),

    location: {
      country: 'Rwanda',
      city: 'Kigali',
      district: (raw.district as KigaliDistrict) || 'City Center',
      startingPoint: raw.startingPoint || 'Kigali',
    },

    duration: parseDuration(raw.duration),

    price: {
      amount: raw.price || 0,
      currency: 'USD',
    },

    type: 'Group',

    images: images,
    highlights: raw.adventureSteps || [],
    adventureSteps: raw.adventureSteps || [],

    availability: {
      totalSlots: (raw.slots || 0) + (raw.numberPerPerson || 0),
      remainingSlots: raw.slots || 0,
      minParticipants: raw.numberPerPerson || 1,
    },

    assurance: {
      rating: raw.rating || 4.8,
      reviewCount: raw.reviewCount || 12,
      recommendationTag: getRecommendationTag(raw.price || 0),
      isVerified: true,
    },

    difficulty: 'Moderate',
    languages: ['English', 'French'],
    link: `/tours/${raw.id}`,
    created_at: raw.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
