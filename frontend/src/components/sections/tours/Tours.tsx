import React, { useRef, useState, useMemo } from 'react';
import { ImmersiveTourCard } from './ImmersiveTourCard';
import { useTours } from '@/hooks/useTours';
import {
  Landmark,
  Palette,
  TreePine,
  Building2,
  LayoutGrid,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Spinner } from '../../ui/spinner';

gsap.registerPlugin(ScrollTrigger);

// const categories = [
//   { id: 'all', label: 'All', icon: LayoutGrid },
//   { id: 'historical', label: 'History', icon: Landmark },
//   { id: 'arts', label: 'Culture', icon: Palette },
//   { id: 'nature', label: 'Nature', icon: TreePine },
//   { id: 'modern', label: 'City', icon: Building2 },
// ];

const categories = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'Genocide Memorial & Historical', label: 'History', icon: Landmark },
  { id: 'Art & Culture', label: 'Culture', icon: Palette },
  { id: 'Nature & Hiking', label: 'Nature', icon: TreePine },
  { id: 'Urban Exploration', label: 'City', icon: Building2 },
] as const;

const ToursSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: tours = [], isLoading } = useTours();
  console.log('Tours: ', tours);
  const filteredTours = useMemo(() => {
    if (activeCategory === 'all') return tours;
    return tours.filter(
      (tour) => tour.category === activeCategory,
    );
  }, [activeCategory, tours]);

  useGSAP(
    () => {
      // 1. One-time Entrance for the Header
      gsap.fromTo('.section-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });

      // 2. Filter Animation for the Cards
      // We only run this if we aren't loading and have items to show
      if (!isLoading && filteredTours.length > 0) {
        gsap.fromTo(
          '.tour-card-wrapper', // Ensure the card component is wrapped in this class
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.5,
            ease: 'power2.out',
            overwrite: true,
          },
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [activeCategory, tours, isLoading],
    },
  );

  return (
    <section
      ref={containerRef}
      className='py-24 bg-neutral-50 min-h-screen overflow-hidden'
    >
      <div className='container mx-auto px-6 md:px-12'>
        <div className='section-header flex flex-col items-center text-center mb-16 space-y-4'>
          <span className='text-green-600 font-bold tracking-widest text-xs uppercase bg-green-100 px-4 py-1 rounded-full'>
            Discover Rwanda
          </span>
          <h2 className='text-4xl md:text-6xl font-bold text-slate-900 tracking-tight'>
            Curated Experiences
          </h2>
          <p className='text-slate-500 max-w-2xl text-lg leading-relaxed'>
            From the vibrant streets of Kigali to the serene hills of the
            countryside.
          </p>

          <div className='flex flex-wrap justify-center gap-3 mt-8'>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg scale-105'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className='min-h-100'>
          {isLoading ? (
            <div className='flex justify-center items-center h-64'>
              <Spinner className='size-8' />
            </div>
          ) : filteredTours.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
              {filteredTours.map((tour) => (
                <div key={tour.id} className='tour-card-wrapper'>
                  <ImmersiveTourCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20 text-slate-400'>
              <p>No tours found in this category. Try another?</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
