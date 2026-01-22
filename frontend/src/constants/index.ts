import { rawTours } from '@/data/rawTours';
import type { Tour, TourType } from '@/types/tour';
import { mapTourToTour } from '@/utils/mapTour';

const navLinks = [
  {
    id: 'tours',
    title: 'Tours',
    url: '/tours',
  },
  {
    id: 'book_now',
    title: 'Book Now',
    url: '/book-tour',
  },
  {
    id: 'kigalitours',
    title: 'Kigali Tours',
  },
  {
    id: 'contact_us',
    title: 'Contact Us',
    url: '/contact-us',
  },
  {
    id: 'gallery',
    title: 'Gallery',
  },
];

const serviceLists = [
  {
    id: 'personalized-journeys',
    icon: 'fa_heart',
    title: 'Personalized Journeys',
    description:
      "Whether you're a history buff, a food enthusiast, or an art lover, our tours are crafted to match your interests. Enjoy intimate small groups or exclusive private experiences.",
  },
  {
    id: 'insightful-local-guides',
    icon: 'fa_guide',
    title: 'Insightful Local Guides',
    description:
      'Our passionate guides are local experts, eager to share their knowledge and personal stories, providing a truly authentic perspective of Kigali.',
  },
  {
    id: 'sustainable-tourism',
    icon: 'fa_leaf',
    title: 'Sustainable Tourism',
    description:
      "We are committed to responsible tourism that benefits local communities and preserves Kigali's natural beauty and cultural heritage.",
  },
] as const;

const tourLists = [
  {
    name: 'Kigali City Highlights',
    details:
      'Explore the Genocide Memorial, Caplaki Craft Village, and local markets.',
    price: 45.0,
    image: 'kigali.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 4,
  },
  {
    name: 'Art & Culture Immersion',
    details:
      'Visit local art galleries, cultural centers, and traditional dance performances.',
    price: 55.0,
    image: 'culture.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },
  {
    name: 'Kigali Local Flavors',
    details:
      'Taste authentic Rwandan cuisine and explore bustling food markets.',
    price: 50.0,
    image: 'town.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 0,
  },
];

export type tourProps = {
  id: string;
  title: string;
  description: string;
  startingPoint: string;
  duration: string;
  estimated?: boolean;
  adventureSteps?: string[];
  price: number;
  imgUrl: string | string[];
  type: TourType;
  numberPerPerson: number;
  slots: number;
};


const tours: Tour[] = rawTours.map(mapTourToTour);


export {
  navLinks,
  serviceLists,
  tourLists,
  tours,
};
