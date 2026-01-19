import { tours } from '@/data/tours';
import TourCard from '@/components/cards/TourCard';
import Section from '@/components/sections/tours/Section';

const ToursPage = () => {
  return (
    <section className='w-full text-white py-14 px-5 max-w-6xl mx-auto'>
      <Section title='Explore Kigali Tours'>
        <p className='text-lg opacity-90 mb-8'>
          Discover our curated walking tours and experiences in Kigali
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              link={`/tours/${tour.id}`} // Link to TourPage
            />
          ))}
        </div>
      </Section>
    </section>
  );
};

export default ToursPage;
