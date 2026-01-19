import React, { useState } from 'react';
import ExpandableTourCard from '../cards/ExpandableTourCard';
import { tours } from '@/constants';

const Explore = () => {
  const [active, setActive] = useState(tours[0]!.id);
  console.log({ tours });
  const numOfToursToBeShown = 5;
  const totalTours = Math.ceil(tours.length / numOfToursToBeShown);

  const indexOfLast = 1 * numOfToursToBeShown;
  const indexOfFirst = indexOfLast - numOfToursToBeShown;
  const currentTours = tours.slice(indexOfFirst, indexOfLast);
  console.log({ currentTours });
  return (
    <div className='explore'>
      <section className='mb-16 md:px-20 px-5'>
        <div className='content'>
          <div className='md:col-span-8'>
            <h2 className='font-bold max-w-2xl'>Make Your Journey Worth It</h2>
          </div>
          <div className='sub-content md:col-span-4'>
            <p>
              Watch out for historical and memorial sites as you learn and
              experience how history has shaped art, culture and foods to build
              and bring abandance to local life, eco-existance with nature and
              outdoor activities in Rwanda.
            </p>
          </div>
        </div>
      </section>
      <section className='mt-12.5 flex lg:flex-row flex-col min-h-[70vh] gap-5 w-[87%]'>
        {tours.slice(0, 5).map((tour, index) => (
          <ExpandableTourCard
            key={tour.id}
            tour={{
              id: tour.id,
              name: tour.name,
              images: tour.images,
            }}
            index={index}
            active={active}
            onSelect={setActive}
          />
        ))}
      </section>
    </div>
  );
};

export default Explore;
