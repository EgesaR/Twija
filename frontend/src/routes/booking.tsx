import TourBookingStepper from '@/components/TourBookingStepper';
import React from 'react';

const Booking = () => {
  return (
    // min-h-screen is safer than h-screen for forms that might grow
    // pt-32 ensures it clears your fixed Navbar (mt-20 is often not enough)
    <div className='min-h-screen bg-[#0f0f0f] flex flex-col items-center pt-32 pb-20 px-4'>
      {/* Header Section */}
      <div className='text-center mb-12 space-y-2'>
        <h1 className='text-4xl md:text-5xl font-bold text-white tracking-tight'>
          Book Your Experience
        </h1>
        <p className='text-gray-400 max-w-md mx-auto'>
          Complete the steps below to secure your guided tour through the heart
          of Rwanda.
        </p>
      </div>

      {/* Stepper Container */}
      <div className='w-full max-w-4xl'>
        <TourBookingStepper />
      </div>
    </div>
  );
};

export default Booking;
