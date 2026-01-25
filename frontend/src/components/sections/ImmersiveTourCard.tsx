import React from 'react';
import { BadgeCheck, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/utils/images'; // Assuming utility exists
import { useNavigate } from 'react-router';

// Define Interface based on your Supabase structure
interface TourProps {
  tour: {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[] | null; // or images: string[] based on previous component
    price: number | null;
    duration: string | null;
    slots?: number;
  };
}

export const ImmersiveTourCard = ({ tour }: TourProps) => {
  const navigate = useNavigate();
  // Handle image array or string
  const imgSource = Array.isArray(tour.images)
    ? tour.images[0]
    : tour.images;
  const image = getImageUrl(imgSource || 'placeholder.jpg');

  return (
    <div
      onClick={() => navigate(`/book/${tour.id}`)}
      className='tour-card group relative h-[420px] w-full rounded-[2rem] overflow-hidden cursor-pointer bg-slate-100 isolate'
    >
      {/* 1. Background Image (Zoom effect on hover) */}
      <img
        src={image}
        alt={tour.title}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
      />

      {/* 2. Gradient Overlays */}
      {/* Top gradient for badges */}
      <div className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent opacity-80' />
      {/* Bottom gradient for text (Always visible but gets darker on hover) */}
      <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 group-hover:from-black' />

      {/* 3. Top Badges (Price & Status) */}
      <div className='absolute top-5 left-5 right-5 flex justify-between items-start z-10'>
        <div className='flex flex-col items-start gap-2'>
          <span className='bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10 uppercase tracking-wider'>
            {tour.category || 'General'}
          </span>
          {tour.slots && tour.slots < 5 && (
            <span className='bg-red-500/90 text-white px-3 py-1 rounded-full text-[10px] font-bold animate-pulse'>
              {tour.slots} Spots Left
            </span>
          )}
        </div>
        <div className='bg-white text-slate-900 px-4 py-1.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-1'>
          ${tour.price}
        </div>
      </div>

      {/* 4. Content Content (Bottom) */}
      <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end h-full'>
        {/* Title Area */}
        <div className='transition-transform duration-500 group-hover:-translate-y-2'>
          <div className='flex items-center gap-2 mb-2 text-green-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0'>
            <BadgeCheck size={14} /> Verified Tour
          </div>

          <h3 className='text-2xl font-bold text-white leading-tight mb-2 font-serif'>
            {tour.title}
          </h3>

          {/* Description - Truncated, expands slightly visually by context */}
          <p className='text-slate-300 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:text-white transition-colors'>
            {tour.description}
          </p>
        </div>

        {/* 5. Action Area (Hidden by default, slides up) */}
        <div className='mt-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out'>
          <div className='overflow-hidden'>
            <div className='flex items-center justify-between pt-4 border-t border-white/20'>
              <div className='flex items-center gap-2 text-slate-300 text-xs'>
                <Clock size={14} />
                <span>{tour.duration || 'Full Day'}</span>
              </div>
              <Button
                size='sm'
                className='rounded-full bg-white text-slate-900 hover:bg-green-500 hover:text-white border-0 transition-colors'
              >
                View Details <ArrowRight size={14} className='ml-1' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
