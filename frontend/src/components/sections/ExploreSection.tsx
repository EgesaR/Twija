'use client';

import React, { useState, useRef } from 'react';
import ExpandableTourCard from '../cards/ExpandableTourCard';
import { tours } from '@/data/tours';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

const Explore = () => {
  const [active, setActive] = useState<string>(tours[0]?.id || '');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Set initial state immediately to avoid "flash"
      gsap.set(['.explore-header', '.tour-card-anim'], {
        y: 40,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          // 'play none none none' ensures it plays once and never reverses/resets
          toggleActions: 'play none none none',
          once: true, // Crucial: destroys the scrolltrigger after it fires once
        },
      });

      tl.to('.explore-header', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      }).to(
        '.tour-card-anim',
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          // clearProps wipes GSAP's inline styles so they don't fight your Tailwind 'active' classes
          clearProps: 'all',
        },
        '-=0.4',
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className='explore py-12 md:py-20 bg-[#FDFDFD] overflow-hidden'
    >
      {/* Header Section */}
      <section className='mb-12 md:px-20 px-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-8'>
          <div className='explore-header'>
            <h2 className='text-4xl md:text-7xl font-bold tracking-tight text-slate-900'>
              Discover <br />
              <span className='text-green-600'>The Heart</span> of Rwanda
            </h2>
          </div>
          <div className='explore-header md:w-1/2'>
            <p className='text-slate-500 text-lg border-l-4 border-green-500 pl-6'>
              Step into Rwanda&apos;s living story—where history shapes culture,
              culture inspires art and cuisine, and nature sustains everyday
              life. From meaningful outdoor experiences to community-led
              eco-tourism, each journey connects you to the soul of the land.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Layout */}
      <section className='flex flex-col lg:flex-row h-[750px] lg:h-[70vh] min-h-[650px] gap-3 w-full px-4 md:px-20'>
        {tours.slice(0, 5).map((tour, index) => (
          <div
            key={tour.id}
            onClick={() => setActive(tour.id)}
            className={`tour-card-anim relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
              ${
                active === tour.id
                  ? 'flex-[10] lg:flex-[3.5]'
                  : 'flex-[1.5] lg:flex-[0.7] min-h-[80px] lg:min-h-0'
              }
            `}
          >
            <ExpandableTourCard
              tour={tour}
              index={index}
              active={active}
              onSelect={setActive}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Explore;
