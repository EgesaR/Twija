import React from 'react';

const Feedback = () => {
  return (
    <section className='feedback'>
      <div className='w-full flex flex-center mb-18'>
        <h1 className='text-5xl font-semibold'>A Word From The Founder</h1>
      </div>

      <div className='w-full mx-auto flex lg:flex-row flex-col gap-6 h-100'>
        <div className='flex-[0.5] lg:max-w-120.5 flex flex-center rounded-4xl border border-[#6a6a6a] relative'>
          {/* Founder image goes here */}
        </div>

        <div className='flex-1 flex justify-center flex-col sm:p-8 p-4 rounded-4xl relative'>
          <div>
            <h4 className='font-bold sm:text-[32px] text-[26px] sm:leading-10 leading-9 text-neutral-800'>
              John Doe
            </h4>

            <p className='mt-2 font-normal sm:text-[14px] text-[15px] sm:leading-5.5 leading-4 text-neutral-800'>
              Founder | Twija Africa Safari
            </p>

            <p className='mt-6 font-normal sm:text-[19px] text-[16px] sm:leading-11.25 leading-9.75 text-neutral-800'>
              &quot;Twija Africa Safari was born from a deep love for Kigali and
              a desire to share its true story with the world. Every walk we
              take is more than a tour — it’s a journey through our history,
              culture, and everyday life. Guided by passionate locals, we create
              meaningful experiences that connect travelers with our people,
              support our communities, and preserve the beauty of Rwanda for
              generations to come.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
