import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Tour } from '@/types/tour';
import { getImageUrl } from '@/utils/images';
import { Link } from 'react-router';

type Props = {
  tour: Tour;
  link?: string;
  variant?: 'compact' | 'expandable';
};

const TourCard = ({ tour, link, variant = 'compact' }: Props) => {
  const image = getImageUrl(tour.images?.[0] || '/placeholder.jpg');

  const CardContent = (
    <Card className='card flex flex-col cursor-pointer hover:scale-[1.02] p-2 transition-transform duration-300 ease-in-out'>
      {/* IMAGE */}
      <div className='w-full overflow-hidden rounded-3xl'>
        <img
          src={image}
          alt={tour.name}
          className='w-full h-48 md:h-56 object-cover'
        />
      </div>

      {/* CONTENT */}
      <div className='flex flex-col flex-1 p-4 gap-2'>
        <h3 className='text-xl font-semibold leading-snug line-clamp-2'>
          {tour.name}
        </h3>
        <p className='text-sm opacity-80 flex-1 line-clamp-3'>
          {tour.description}
        </p>

        <div className='flex gap-2 flex-wrap'>
          <Badge>${tour.price}</Badge>
          <Badge>{tour.type}</Badge>
          <Badge>{tour.slots} slots</Badge>
        </div>

        <Button className='mt-2 w-full bg-neutral-800 hover:cursor-pointer'>Plan Trip</Button>
      </div>
    </Card>
  );

  return link ? <Link to={link}>{CardContent}</Link> : CardContent;
};

export default TourCard;
