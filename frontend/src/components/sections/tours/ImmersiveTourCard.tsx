import React from 'react';
import { BadgeCheck, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/utils/images';
import { useNavigate } from 'react-router';
import type { Tour } from '@/types/tour'; // Import the real type

interface TourProps {
  tour: Tour;
}

export const ImmersiveTourCard = ({ tour }: TourProps) => {
  const navigate = useNavigate();
  const heroImage = getImageUrl(tour.images[0] || 'placeholder.jpg');

  return (
    <div
      onClick={() => navigate(`/tours/${tour.id}`)}
      className='tour-card group relative h-105 w-full rounded-4xl overflow-hidden cursor-pointer bg-slate-100 isolate shadow-sm hover:shadow-2xl transition-all duration-500'
    >
      {/* Background */}
      <img
        src={heroImage}
        alt={tour.title}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
      />

      {/* Overlays */}
      <div className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent opacity-80' />
      <div className='absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />

      {/* Top Badges */}
      <div className='absolute top-5 left-5 right-5 flex justify-between items-start z-10'>
        <div className='flex flex-col gap-2'>
          {/* Category Badge */}
          <span className='bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10 uppercase tracking-wider'>
            {tour.category}
          </span>
          {/* Recommendation Tag (The "Assurance" bit) */}
          {tour.assurance.recommendationTag && (
            <span className='bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg w-fit'>
              {tour.assurance.recommendationTag}
            </span>
          )}
        </div>

        {/* Price Badge */}
        <div className='bg-white text-slate-900 px-4 py-1.5 rounded-full font-bold text-sm shadow-xl'>
          ${tour.price.amount}
        </div>
      </div>

      {/* Bottom Content */}
      <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end h-full'>
        <div className='transition-transform duration-500 group-hover:-translate-y-2'>
          {/* Verified Badge */}
          {tour.assurance.isVerified && (
            <div className='flex items-center gap-2 mb-2 text-green-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0'>
              <BadgeCheck size={14} /> Verified Tour
            </div>
          )}

          <h3 className='text-2xl font-bold text-white leading-tight mb-2 font-serif'>
            {tour.title}
          </h3>

          <p className='text-slate-300 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:text-white transition-colors'>
            {tour.description}
          </p>
        </div>

        {/* Slide-up Action Area */}
        <div className='grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out'>
          <div className='overflow-hidden'>
            <div className='flex items-center justify-between pt-4 border-t border-white/20 mt-4'>
              <div className='flex gap-4 text-slate-300 text-xs'>
                <div className='flex items-center gap-1.5'>
                  <Clock size={14} />
                  <span>
                    {tour.duration.value} {tour.duration.unit}
                  </span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <MapPin size={14} />
                  <span>{tour.location.district}</span>
                </div>
              </div>

              <Button
                size='sm'
                className='rounded-full bg-white text-slate-900 hover:bg-green-500 hover:text-white border-0 transition-colors'
              >
                Details <ArrowRight size={14} className='ml-1' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
