import React, { useState, useMemo, useRef } from 'react';
import { useTours } from '@/hooks/useTours';
import TourCard from '@/components/cards/TourCard';
import { TourCardSkeleton } from '@/components/sections/tours/TourCardSkeleton';
import { Search, Info, MapPin, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/utils/images';

const ToursPage = () => {
  const { data: tours = [], isLoading } = useTours();
  const [query, setQuery] = useState('');
  const container = useRef<HTMLDivElement>(null);

  const filteredTours = useMemo(() => {
    return tours.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [tours, query]);

  // GSAP: Entrance Animation
  useGSAP(() => {
    if (!isLoading) {
      gsap.from('.tour-anim-node', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.2,
      });
    }
  }, [isLoading, filteredTours.length]);

  return (
    <div ref={container} className='min-h-screen bg-neutral-50'>
      {/* HEADER SECTION */}
      <header className='relative h-[50vh] min-h-[400px] w-full overflow-hidden text-white shadow-2xl'>
        {/* FIRST PART: Three Background Images (The Background) */}
        <div className='absolute inset-0 z-0 grid grid-cols-3 w-full h-full'>
          {[
            'kigali2.jpg', // Replace with your actual image paths
            'b.jpg',
            'hero-bg.jpg',
          ].map((img, i) => (
            <div
              key={i}
              className='relative overflow-hidden border-r border-white/5'
            >
              <img
                src={getImageUrl(`${img}`)}
                alt={`Kigali ${i}`}
                className='object-cover w-full h-full transition-transform duration-[3000ms] hover:scale-110'
              />
            </div>
          ))}

          {/* Gradient Overlay: Darker at the bottom to transition into the results */}
          <div className='absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/60 z-10' />
        </div>

        {/* SECOND PART: Centered Content Block */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6 z-20 text-center space-y-4'>
          <div className='page-header space-y-2'>
            <Badge className='bg-green-600 text-white border-none px-3 py-0.5 text-[10px] uppercase tracking-widest'>
              Explore Rwanda
            </Badge>
            <h1 className='text-3xl md:text-5xl font-bold font-serif tracking-tight'>
              Find Your Next <span className='text-green-400'>Adventure</span>
            </h1>
            <p className='text-slate-300 text-sm md:text-base max-w-lg mx-auto'>
              Expert-led tours through Kigali’s history, art, and nature.
            </p>
          </div>

          {/* SEARCH BAR: Made slightly more compact */}
          <div className='relative max-w-lg mx-auto group mt-6'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors'
              size={18}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search experiences...'
              className='pl-12 h-11 rounded-xl border-none bg-white text-slate-900 shadow-xl focus-visible:ring-2 focus-visible:ring-green-500 text-md'
            />
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12'>
        {/* RESOURCEFUL SIDEBAR */}
        <aside className='lg:col-span-1 space-y-8'>
          <div className='bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100'>
            <h3 className='font-bold text-slate-900 mb-4 flex items-center gap-2'>
              <Sparkles size={18} className='text-green-600' /> Quick Tips
            </h3>
            <ul className='space-y-4 text-sm text-slate-500'>
              <li className='flex gap-3'>
                <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-700 text-[10px] font-bold'>
                  1
                </div>
                Wear comfortable walking shoes for city tours.
              </li>
              <li className='flex gap-3'>
                <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-700 text-[10px] font-bold'>
                  2
                </div>
                Tipping is appreciated but not mandatory (10% is standard).
              </li>
              <li className='flex gap-3'>
                <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-700 text-[10px] font-bold'>
                  3
                </div>
                Keep hydrated! We provide water on all "Long" tours.
              </li>
            </ul>
          </div>

          <div className='bg-green-600 p-6 rounded-[2rem] text-white shadow-lg shadow-green-200'>
            <Info className='mb-2 opacity-80' />
            <h4 className='font-bold mb-2'>Need a custom trip?</h4>
            <p className='text-xs opacity-90 leading-relaxed mb-4'>
              We can organize private expeditions for groups of any size.
            </p>
            <button className='w-full py-2 bg-white text-green-600 rounded-xl text-xs font-bold'>
              Contact Support
            </button>
          </div>
        </aside>

        {/* TOUR GRID */}
        <main className='lg:col-span-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {isLoading ? (
              [...Array(6)].map((_, i) => <TourCardSkeleton key={i} />)
            ) : filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <div key={tour.id} className='tour-anim-node'>
                  <TourCard tour={tour} link={`/tours/${tour.id}`} />
                </div>
              ))
            ) : (
              <div className='col-span-full py-20 text-center space-y-4'>
                <MapPin size={48} className='mx-auto text-slate-200' />
                <p className='text-slate-400'>
                  No tours found matching your search.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ToursPage;
