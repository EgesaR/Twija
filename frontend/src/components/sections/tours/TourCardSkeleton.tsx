// components/sections/tours/TourCardSkeleton.tsx
import React from 'react';

export const TourCardSkeleton = () => {
  return (
    <div className='h-[420px] w-full rounded-[2rem] bg-neutral-200 animate-pulse relative overflow-hidden'>
      {/* Mimic Top Badges */}
      <div className='absolute top-5 left-5 right-5 flex justify-between items-start'>
        <div className='flex flex-col gap-2'>
          <div className='h-6 w-20 bg-neutral-300 rounded-full' />
          <div className='h-4 w-16 bg-neutral-300 rounded-full' />
        </div>
        <div className='h-8 w-14 bg-neutral-300 rounded-full' />
      </div>

      {/* Mimic Bottom Content */}
      <div className='absolute bottom-0 left-0 right-0 p-8 space-y-4'>
        <div className='h-4 w-24 bg-neutral-300 rounded-md' />{' '}
        {/* Verified Badge */}
        <div className='h-8 w-3/4 bg-neutral-300 rounded-lg' /> {/* Title */}
        <div className='space-y-2'>
          <div className='h-3 w-full bg-neutral-300 rounded-md' />{' '}
          {/* Desc Line 1 */}
          <div className='h-3 w-2/3 bg-neutral-300 rounded-md' />{' '}
          {/* Desc Line 2 */}
        </div>
        {/* Mimic Bottom Bar */}
        <div className='pt-4 border-t border-neutral-300 flex justify-between items-center'>
          <div className='flex gap-3'>
            <div className='h-4 w-12 bg-neutral-300 rounded-md' />
            <div className='h-4 w-12 bg-neutral-300 rounded-md' />
          </div>
          <div className='h-10 w-24 bg-neutral-300 rounded-full' />
        </div>
      </div>
    </div>
  );
};
