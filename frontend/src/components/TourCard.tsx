import React, { type Dispatch, type SetStateAction } from 'react';
import { motion } from 'framer-motion';
import type { tourProps } from '@/constants';
import { getImageUrl } from '../utils/images';
import { fadeIn } from '@/utils/motion';
import { Car } from 'lucide-react';

const TourCard = ({
  index,
  tour,
  active,
  handleClick,
}: {
  index: number;
  active: string;
  handleClick: Dispatch<SetStateAction<string>>;
  tour: tourProps;
}) => {
  const imgUrl = !tour.imgUrl
    ? ''
    : typeof tour.imgUrl === 'string'
      ? tour.imgUrl
      : tour.imgUrl[0];
  return (
    <motion.div
      initial={{
        x: '-100%',
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', delay: index * 0.5, duration: 0.75 }}
      className={`relative ${active === tour.id ? 'lg:flex-[3.5] flex-20' : 'lg:flex-[0.1] flex-3'} flex items-center justify-center min-w-42.5 h-120 transition-[flex] duration-700 ease-out cursor-pointer`}
      onClick={() => handleClick(tour.id)}
    >
      <img
        src={getImageUrl(imgUrl!)}
        alt={tour.name}
        className='absolute w-full h-full object-cover rounded-[24px]'
      />
      {active !== tour.id ? (
        <h3 className='font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:-rotate-90 lg:origin-[0,0]'>
          {tour.name}
        </h3>
      ) : (
        <div className='absolute bottom-0 p-8 justify-start w-full flex-col bg-linear-to-b from-transparent to-[rgba(0,0,0,0.6)] rounded-b-[24px]'>
          <div className='flex items-center justify-center size-14 rounded-3xl glassmorphism mb-4'>
            <Car className='size-1/2' />
          </div>
          <p className='font-normal text-[16px] leading-5 text-white uppercase'>
            Enter the Metaverse
          </p>
          <h2 className='mt-6 font-semibold sm:text-[32px] text-[24px] text-white'>
            {tour.name}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

export default TourCard;
