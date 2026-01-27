import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Tour } from '@/types/tour';
import { getImageUrl } from '@/utils/images';
import { Link } from 'react-router';
import { Clock, Users, ArrowRight } from 'lucide-react';

type Props = {
  tour: Tour;
  link?: string;
};

const TourCard = ({ tour, link }: Props) => {
  const image = getImageUrl(tour.images?.[0] || '/placeholder.jpg');

  const CardContent = (
    <Card className='group flex flex-col cursor-pointer p-2 transition-all duration-500 hover:shadow-xl border-slate-100 bg-white rounded-[2rem] overflow-hidden'>
      {/* IMAGE CONTAINER */}
      <div className='w-full overflow-hidden rounded-[1.8rem] relative'>
        <img
          src={image}
          alt={tour.title}
          className='w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className='absolute top-4 right-4'>
          <Badge className='bg-white/90 backdrop-blur-sm text-slate-900 border-none px-3 py-1 font-bold'>
            {/* FIXED: Accessed .amount to avoid Object error */}$
            {tour.price.amount}
          </Badge>
        </div>
      </div>

      {/* CONTENT */}
      <div className='flex flex-col flex-1 p-5 gap-3'>
        <div className='flex justify-between items-start'>
          <h3 className='text-lg font-bold leading-tight text-slate-900 line-clamp-2 font-serif'>
            {tour.title}
          </h3>
        </div>

        <p className='text-xs text-slate-500 line-clamp-2 leading-relaxed'>
          {tour.description}
        </p>

        <div className='flex gap-3 mt-2'>
          <div className='flex items-center gap-1 text-[10px] font-medium text-slate-400'>
            <Clock size={12} /> {tour.duration.value} {tour.duration.unit}
          </div>
          <div className='flex items-center gap-1 text-[10px] font-medium text-slate-400'>
            <Users size={12} /> Max {tour.availability.totalSlots}
          </div>
        </div>

        <Button className='mt-2 w-full bg-slate-900 rounded-xl group-hover:bg-green-600 transition-colors duration-300'>
          Plan Trip{' '}
          <ArrowRight
            size={14}
            className='ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all'
          />
        </Button>
      </div>
    </Card>
  );

  return link ? <Link to={link}>{CardContent}</Link> : CardContent;
};

export default TourCard;
