import type { tourProps } from '@/constants';

export const rawTours: tourProps[] = [
  {
    id: 'tour-1',
    title: 'Kigali Easy Walking Tour',
    description: "A gentle stroll exploring Kigali's history and culture",
    startingPoint: 'Kandt Museum',
    duration: '2 Hours',
    estimated: true,
    adventureSteps: [
      'Kandt Museum',
      'Downtown Kigali',
      'Car Free Zone',
      'Local city vibes',
    ],
    price: 25,
    imgUrl: 'kigali2.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },

  {
    id: 'tour-2',
    title: 'Luxury Akagera National Park Safari',
    description:
      'Experience a luxurious full-day safari adventure in Akagera National Park.',
    startingPoint: 'Hotel pickup',
    duration: '1 Day',
    estimated: true,
    adventureSteps: [
      'Luxury game drive',
      'Wildlife spotting',
      'Lunch in the park',
      'Scenic landscapes',
    ],
    price: 25,
    imgUrl: ['b.jpg', 'IMG-20260112-WA0034.jpg'],
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },

  {
    id: 'tour-3',
    title: 'Downtown & Car-Free Zone Walk',
    description:
      "A quick and lively walk through Kigali's bustling downtown and car-free zone.",
    startingPoint: 'Downtown Kigali',
    duration: '2 Hours 30 Minutes',
    estimated: true,
    adventureSteps: ['Downtown Kigali', 'Car Free Zone', 'Urban city life'],
    price: 20,
    imgUrl: ['hero-bg.jpg', 'kigali4.jpg'],
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },

  {
    id: 'tour-4',
    title: 'Kigali Long Tour Adventure',
    description:
      "A comprehensive journey through Kigali's key historical, cultural, and modern landmarks.",
    startingPoint: 'Kigali Genocide Memorial',
    duration: '4 Hours',
    estimated: true,
    adventureSteps: [
      'Genocide Memorial',
      'Kandt Museum',
      'Car Free Zone',
      'Imbuga City Walk',
    ],
    price: 30,
    imgUrl: '4.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },

  {
    id: 'tour-5',
    title: 'Kigali Discovered Walk',
    description:
      'Uncover hidden gems and significant cultural sites on this enlightening walk.',
    startingPoint: 'Kigali Convention Center',
    duration: '4 Hours 30 Minutes',
    estimated: true,
    adventureSteps: [
      'Inema Art Center',
      'Nyamirambo Women’s Center',
      'City Market',
      'Cultural immersion',
    ],
    price: 40,
    imgUrl: '3.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },

  {
    id: 'tour-6',
    title: 'Kigali Motorbike Tour',
    description:
      'Experience Kigali like a local! A thrilling motorbike tour to key city attractions.',
    startingPoint: 'Hotel pickup',
    duration: '6 Hours',
    estimated: true,
    adventureSteps: [
      'Motorbike ride',
      'Local neighborhoods',
      'Markets & art centers',
      'Authentic city experience',
    ],
    price: 65,
    imgUrl: 'kigali.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },

  {
    id: 'tour-7',
    title: 'Kigali Car Tour',
    description:
      "A comfortable full-day car tour exploring Kigali's landmarks and coffee farm.",
    startingPoint: 'Hotel pickup',
    duration: '1 Day',
    estimated: true,
    adventureSteps: [
      'Private vehicle',
      'Coffee farm tour',
      'City landmarks',
      'Relaxed travel',
    ],
    price: 250,
    imgUrl: 'kigali1.jpg',
    type: 'Open Trip',
    numberPerPerson: 1,
    slots: 2,
  },
];
