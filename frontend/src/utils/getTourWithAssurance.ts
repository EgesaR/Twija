import type { Tour } from "@/types/tour";

export const getTourWithAssurance = (tour: Tour): Tour => {
  const updatedTour = { ...tour };

  // Logic: High rating + many reviews = Best Seller
  if (tour.assurance.rating >= 4.8 && tour.assurance.reviewCount > 50) {
    updatedTour.assurance.recommendationTag = 'Best Seller';
  }
  // Logic: High rating but fewer reviews = Top Rated
  else if (tour.assurance.rating >= 4.5) {
    updatedTour.assurance.recommendationTag = 'Top Rated';
  }

  return updatedTour;
};
