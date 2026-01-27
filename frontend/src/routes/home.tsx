import type { Route } from './+types/home';
import Hero from '@/components/sections/Hero';
import SmallServices from '@/components/sections/SmallServices';
import Tours from '@/components/sections/tours/Tours';
import Explore from '@/components/sections/ExploreSection';
import Feedback from '@/components/sections/Feedback';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Kigali City Tours & Walking Expeditions | Twija Africa Safari' },
    {
      name: 'description',
      content:
        'Discover the heart of Rwanda with our curated Kigali walking tours. Explore historical landmarks, vibrant local markets, and cultural gems with expert local guides from Twija Africa Safari.',
    },
    {
      name: 'keywords',
      content:
        'Kigali tours, Kigali walking tours, Rwanda tours, Kigali city tour, things to do in Kigali, Rwanda cultural tours, Twija Africa Safari',
    },
    { name: 'author', content: 'Twija Africa Safari' },
    { name: 'robots', content: 'index, follow' },
    {
      name: 'google-site-verification',
      content: 'ERwMq3r779g9QA9E8wXcHEuiIylCdZ_OnZ3wR3fUksY', //'nmLBFhaJfUBwUecOE5v0E7i2yCNTSCrheTHBn6RcKUM',
    },

    // Canonical
    {
      tagName: 'link',
      rel: 'canonical',
      href: 'https://www.twijakigalitours.com/',
    },

    // Open Graph / Facebook
    {
      property: 'og:title',
      content: 'Kigali City Tours & Walking Expeditions',
    },
    {
      property: 'og:description',
      content:
        "Explore the best of Rwanda's capital with expert-led walking tours from Twija Africa Safari.",
    },
    {
      property: 'og:image',
      content: 'https://www.twijakigalitours.com/images/hero-image-kigali.jpg',
    },
    { property: 'og:url', content: 'https://www.twijakigalitours.com/' },
    { property: 'og:type', content: 'website' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Kigali City Tours & Walking Expeditions',
    },
    {
      name: 'twitter:description',
      content:
        "Explore the best of Rwanda's capital with expert-led walking tours.",
    },
  ];
}

export default function Home() {
  return (
    <div className='relative min-h-screen bg-white text-black'>
      <Hero />
      <SmallServices />
      <Tours />
      <Explore />
      <Feedback />
    </div>
  );
}
