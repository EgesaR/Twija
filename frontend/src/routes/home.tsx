import { getImageUrl } from '@/utils/images';
import type { Route } from './+types/home';
import Hero from '@/components/sections/Hero';
// import Services from '@/components/sections/Services';
// import SmallServices from '@/components/sections/SmallServices';
// import Tours from '@/components/sections/Tours';
// import Explore from '@/components/sections/ExploreSection';
// import Feedback from '@/components/sections/Feedback';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Kigali Walking Tours & Expeditions' },
    {
      name: 'description',
      content:
        'Discover the best walking tours, cultural experiences, and expeditions in Kigali, Rwanda.',
    },
  ];
}

export default function Home() {
  return (
    <div className='relative min-h-screen bg-black text-white'>
      <Hero />
      {/* <SmallServices />
      <Tours />
      <Explore />
      <Feedback /> */}
    </div>
  );
}
