export type TourReview = {
  userId: string;
  tourId: string;
  rating: number;
  comment?: string;
  date: string;
};

export type TourBooking = {
  bookingId: string;
  tourId: string;
  userId: string;
  numberOfPeople: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'canceled';
};

export type TourAvailability = {
  tourId: string;
  date: string;
  availableSlots: number;
};

export type TourItinerary = {
  day: number;
  activities: string[];
};
