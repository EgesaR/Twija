import type { Tour } from '@/types/tour';
import { getImageUrl } from '@/utils/images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import InfoItem from '@/components/sections/tours/InfoItem';
import Section from '@/components/sections/tours/Section';
import { tours } from '@/data/tours';
import type { Route } from './+types/tours.$tourId';
import { ChevronLeft } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router';

type Props = {
  tour?: Tour;
};

export const loader = async (
  { params }: Route.LoaderArgs
  //{ params: { tourId: string } }
) => {
  const { tourId } = params;

  const tour = tours.find((t) => t.id === tourId);

  if (!tour) throw new Response('Not Found', { status: 404 });

  return { tour };
};

const TourPage = ({ loaderData }: Route.ComponentProps) => {
    const { tour } = loaderData;
    let navigate = useNavigate();

  if (!tour) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center text-white'>
        Loading tour...
      </div>
    );
  }

  const heroImage = tour.images?.[0] || '/placeholder.jpg';

  return (
    <section className='w-full text-white'>
      {/* HERO */}
      <div className='relative h-[70vh]'>
        <img
          src={getImageUrl(heroImage)}
          alt={tour.name}
          className='absolute inset-0 w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black/50 flex flex-col justify-end p-10'>
          <Badge className='w-fit mb-4'>{tour.type}</Badge>
          <h1 className='text-5xl font-semibold max-w-3xl'>{tour.name}</h1>
        </div>
        <Button
          size={'icon-lg'}
          className='absolute top-[25%] left-10 rounded-full hover:cursor-pointer bg-black/50 border border-white/20 hover:bg-black/70'
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className='size-5' />
        </Button>
      </div>

      {/* QUICK INFO */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-10 border-b border-white/10'>
        <InfoItem label='Duration' value={tour.duration} />
        <InfoItem label='Start' value={tour.startingPoint} />
        <InfoItem label='Price' value={`$${tour.price}`} />
        <InfoItem label='Slots' value={`${tour.slots} available`} />
      </div>

      {/* OVERVIEW */}
      <Section title='Overview'>
        <p className='text-lg opacity-90 leading-relaxed max-w-3xl'>
          {tour.description}
        </p>
      </Section>

      {/* HIGHLIGHTS */}
      {tour.highlights && (
        <Section title='Highlights'>
          <ul className='grid md:grid-cols-2 gap-3'>
            {tour.highlights.map((item, i) => (
              <li key={i} className='flex items-center gap-2'>
                <span className='size-2 rounded-full bg-yellow-400' />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ITINERARY */}
      {tour.adventureSteps && (
        <Section title="What You'll Experience">
          <ol className='space-y-3 list-decimal list-inside'>
            {tour.adventureSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Section>
      )}

      {/* GALLERY */}
      {tour.images.length > 1 && (
        <Section title='Gallery'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {tour.images.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                alt=''
                className='rounded-xl object-cover h-56 w-full'
              />
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className='sticky bottom-0 bg-black/90 backdrop-blur border-t border-white/10 p-6 px-10 flex justify-between items-center'>
        <div>
          <p className='text-sm opacity-70'>From</p>
          <p className='text-2xl font-semibold'>${tour.price}</p>
        </div>
        <Button className='px-10 py-6 text-lg rounded-full'>
          Book This Tour
        </Button>
      </div>
    </section>
  );
};

export default TourPage;
