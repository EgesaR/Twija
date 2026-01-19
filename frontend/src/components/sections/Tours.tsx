import React from 'react';
import { Card } from '../ui/card';
import { tourLists } from '@/constants';
import { getImageUrl } from '@/utils/images';
import { Badge } from '../ui/badge';
import { CircleDollarSign, Expand, Users } from 'lucide-react';
import { PiCurrencyCircleDollarFill, PiUsersFourFill } from 'react-icons/pi';
import { Button } from '../ui/button';

const Tours = () => {
  return (
    <div className='tours'>
      <div className='mb-16 md:px-20 px-5'>
        <div className='content'>
          <div className='md:col-span-8'>
            <h2 className='font-bold max-w-2xl'>Our Popular Walking Tours</h2>
          </div>
          <div className='sub-content md:col-span-4'>
            <p>
              We have great options for everyone and cozy spots for your squad
              to enjoy together!
            </p>
          </div>
        </div>
      </div>

      <ul className='grid grid-cols-3 gap-8 w-full px-5 md:px-20'>
        {tourLists.map((tour, index) => (
          <TourCard key={index} {...tour} />
        ))}
      </ul>
    </div>
  );
};

const TourCard = ({
  name,
  details,
  price,
  image,
  type,
  slots = 0,
  numberPerPerson,
}: {
  name: string;
  details: string;
  price: number;
  image: string;
  slots?: number;
  type?: 'Open Trip' | 'Private' | string;
  numberPerPerson: number;
}) => {
  const imageUrl = getImageUrl(image);
  return (
    <Card className='col-span-1 card px-3 gap-3 h-110 relative'>
      <div className='flex justify-between items-center gap-2.5 w-full px-4'>
        <h1 className='text-xl font-medium'>{name}</h1>
        <Badge className='flex items-center justify-center border border-white rounded-lg py-1 px-3'>
          <div className='size-2 bg-yellow-500 rounded-full' />
          <label className='h-full text-[13.5px] font-semibold flex items-center'>
            {slots} Slot left
          </label>
        </Badge>
      </div>
      <div className='w-full h-[70%] relative'>
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-full bg-center bg-cover bg-no-repeat object-cover rounded-xl'
        />
        <div className='absolute top-0 left-0 h-full w-full flex flex-col justify-end'>
          <div className='w-fit mb-4 ml-3 flex gap-1.5 bg-bg-black/10 p-1 rounded-md backdrop-blur'>
            <Badge className='badge text-[16px] rounded-md gap-1.5'>
              <PiCurrencyCircleDollarFill className='size-6!' />
              <label>{price}</label>
            </Badge>
            {type && (
              <Badge className='badge text-[16px] rounded-md gap-1.5'>
                <PiUsersFourFill className='size-6!' /> <label>{type}</label>
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className='w-full flex items-center justify-between pr-6 absolute bottom-[6%]'>
        <Button size={'icon-lg'} variant={'secondary'} className='icon-btn'>
          <Expand />
        </Button>
        <Button variant={'secondary'} className='btn font-medium! text-[19px]!'>
          Plan a Trip
        </Button>
      </div>
    </Card>
  );
};

export default Tours;
