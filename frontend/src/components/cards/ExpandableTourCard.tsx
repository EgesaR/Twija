import React, { type Dispatch, type SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from 'lucide-react';
import { getImageUrl } from '@/utils/images';

type Props = {
  index: number;
  active: string;
  onSelect: Dispatch<SetStateAction<string>>;
  tour: {
    id: string;
    title: string;
    images: string[] | null;
  };
};

const ExpandableTourCard = ({ index, tour, active, onSelect }: Props) => {
  const isActive = active === tour.id;

  console.log({ title: tour.title })

  const firstImage =
    tour.images && tour.images.length > 0 ? tour.images[0] : null;
  const imageUrl = getImageUrl(firstImage ?? '/placeholder-tour.jpg');

  return (
    <motion.div
      layout
      onClick={() => onSelect(tour.id)}
      className={`relative cursor-pointer overflow-hidden rounded-3xl flex items-center justify-center
        ${isActive ? 'lg:flex-[3.5] flex-10' : 'lg:flex-[0.7] flex-2'} 
        h-125 transition-all duration-500`}
    >
      <img
        src={imageUrl}
        alt={tour.title}
        className='absolute inset-0 w-full h-full object-cover'
      />

      {/* Overlay: Darker when collapsed to make vertical text pop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${isActive ? 'opacity-40' : 'opacity-60'}`}
      />

      {!isActive ? (
        // COLLAPSED STATE: VERTICAL CENTERED TITLE
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute inset-0 flex items-center justify-center'
        >
          <h3
            className='font-bold text-white text-lg md:text-xl tracking-wider uppercase
            lg:-rotate-90 whitespace-nowrap text-center w-100 truncate sm:text-ellipsis  px-4'
            title={tour.title} // Shows full title on hover
          >
            {tour.title}
          </h3>
        </motion.div>
      ) : (
        // ACTIVE STATE: BOTTOM CONTENT
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black via-black/30 to-transparent text-white z-20'
        >
          <div className='flex items-center justify-center size-12 rounded-2xl bg-white/20 backdrop-blur-md mb-4'>
            <Car className='text-white' />
          </div>
          <p className='text-xs uppercase tracking-[0.2em] text-green-400 font-bold'>
            Featured Tour
          </p>
          <h2 className='mt-2 font-bold text-2xl md:text-4xl leading-tight max-w-md'>
            {tour.title}
          </h2>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExpandableTourCard;
