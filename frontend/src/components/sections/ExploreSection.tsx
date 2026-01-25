import React, { useState, useRef } from 'react';
import ExpandableTourCard from '../cards/ExpandableTourCard';
import { tours } from '@/data/tours';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Explore = () => {
  // Use .title based on your Tour type definition
  const [active, setActive] = useState<string>(tours[0]?.id || "");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.explore-header', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out',
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className='explore py-20 bg-white'>
      <section className='mb-16 md:px-20 px-6'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-8'>
          <div className='explore-header md:w-1/2'>
            <h2 className='text-4xl md:text-6xl font-bold tracking-tight text-slate-900'>
              Make Your Journey Worth It
            </h2>
          </div>
          <div className='explore-header md:w-1/2'>
            <p className='text-slate-500 text-lg leading-relaxed border-l-4 border-green-500 pl-6'>
              Step into Rwanda’s living story—where history shapes culture,
              culture inspires art and cuisine, and nature sustains everyday
              life. From meaningful outdoor experiences to community-led
              eco-tourism, each journey connects you to the soul of the land.
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto flex lg:flex-row flex-col min-h-150 gap-4 w-full px-6 md:px-20'>
        {tours.slice(0, 5).map((tour, index) => (
          <ExpandableTourCard
            key={tour.id}
            tour={{
              id: tour.id,
              title: tour.title, // Fixed: Use title from Tour type
              images: tour.images,
            }}
            index={index}
            active={active}
            onSelect={setActive}
          />
        ))}
      </section>
    </div>
  );
};

export default Explore;
