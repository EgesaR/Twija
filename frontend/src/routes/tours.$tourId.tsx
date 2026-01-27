import { tours } from '@/data/tours';
import { getImageUrl } from '@/utils/images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import InfoItem from '@/components/sections/tours/InfoItem';
import Section from '@/components/sections/tours/Section';
import { ChevronLeft, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

// NOTE: Since you are using React Router, use useParams() hook instead of loader args
// unless you are using Remix specifically. I adapted this for standard React/Vite.

const TourPage = () => {
  const { tourId } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  // Find the tour
  const tour = tours.find((t) => t.id === tourId);

  if (!tour) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center text-neutral-900'>
        <p>Tour not found.</p>
        <Button onClick={() => navigate('/tours')} variant='link'>
          Back to Tours
        </Button>
      </div>
    );
  }

  const heroImage = tour.images?.[0] || 'placeholder.jpg';

  return (
    <section className='w-full text-neutral-900 bg-white min-h-screen'>
      {/* HERO */}
      <div className='relative h-[60vh] md:h-[70vh]'>
        <img
          src={getImageUrl(heroImage)}
          alt={tour.title}
          className='absolute inset-0 w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10'>
          <div className='flex items-center gap-3 mb-4'>
            <Badge className='bg-green-600 hover:bg-green-700 border-none'>
              {tour.type}
            </Badge>
            {tour.assurance.recommendationTag && (
              <Badge
                variant='outline'
                className='text-white border-white/40 bg-white/10 backdrop-blur-md'
              >
                {tour.assurance.recommendationTag}
              </Badge>
            )}
          </div>

          <h1 className='text-4xl md:text-5xl font-bold text-white max-w-3xl font-serif tracking-tight'>
            {tour.title}
          </h1>

          <div className='flex items-center gap-2 mt-4 text-yellow-400'>
            <Star fill='currentColor' size={18} />
            <span className='text-white font-medium'>
              {tour.assurance.rating}
            </span>
            <span className='text-white/60 text-sm'>
              ({tour.assurance.reviewCount} reviews)
            </span>
          </div>
        </div>

        <Button
          size={'icon'}
          className='absolute top-20 left-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/40 text-white  hover:cursor-pointer'
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className='size-6' />
        </Button>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 py-12 px-6'>
        {/* LEFT COLUMN: Content */}
        <div className='lg:col-span-2 space-y-10'>
          {/* QUICK INFO */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-neutral-50 border border-neutral-100'>
            <InfoItem
              label='Duration'
              value={`${tour.duration.value} ${tour.duration.unit}`}
            />
            <InfoItem label='Start' value={tour.location.startingPoint} />
            <InfoItem
              label='Group Size'
              value={`Max ${tour.availability.totalSlots}`}
            />
            <InfoItem label='Language' value={tour.languages.join(', ')} />
          </div>

          {/* OVERVIEW */}
          <Section title='Overview'>
            <p className='text-lg text-slate-600 leading-relaxed'>
              {tour.description}
            </p>
          </Section>

          {/* ITINERARY */}
          {tour.adventureSteps && (
            <Section title="What You'll Experience">
              <div className='relative pl-8 border-l-2 border-green-100 space-y-8'>
                {tour.adventureSteps.map((step, i) => (
                  <div key={i} className='relative'>
                    <span className='absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-green-100 border-4 border-white flex items-center justify-center text-green-700 text-xs font-bold'>
                      {i + 1}
                    </span>
                    <p className='text-slate-800 font-medium'>{step}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* GALLERY */}
          {tour.images.length > 1 && (
            <Section title='Gallery'>
              <div className='grid grid-cols-2 gap-4'>
                {tour.images.map((img, i) => (
                  <img
                    key={i}
                    src={getImageUrl(img)}
                    alt={`Gallery ${i}`}
                    className='rounded-xl object-cover h-48 w-full hover:opacity-90 transition-opacity'
                  />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Booking Card */}
        <div className='relative'>
          <div className='sticky top-8 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/50 p-6 bg-white'>
            <div className='flex justify-between items-end mb-6'>
              <div>
                <p className='text-slate-500 text-sm mb-1'>Starting from</p>
                <div className='flex items-baseline gap-1'>
                  <span className='text-3xl font-bold text-slate-900'>
                    ${tour.price.amount}
                  </span>
                  <span className='text-slate-500 text-sm'>
                    {tour.price.currency}
                  </span>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${tour.availability.remainingSlots > 5 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
              >
                {tour.availability.remainingSlots} spots left
              </div>
            </div>

            <div className='space-y-3 mb-6'>
              <div className='flex justify-between text-sm py-2 border-b border-slate-100'>
                <span className='text-slate-500'>Date</span>
                <span className='font-medium text-slate-900'>Select Date</span>
              </div>
              <div className='flex justify-between text-sm py-2 border-b border-slate-100'>
                <span className='text-slate-500'>Guests</span>
                <span className='font-medium text-slate-900'>2 Adults</span>
              </div>
            </div>

            <Button className='w-full py-6 text-lg rounded-xl bg-slate-900 hover:bg-green-600 transition-colors'>
              Book Now
            </Button>

            <p className='text-center text-xs text-slate-400 mt-4'>
              Free cancellation up to 24 hours before trip start
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPage;
