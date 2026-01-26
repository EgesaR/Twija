import { tours } from '@/data/rawTours';
import TourCard from '@/components/cards/TourCard';

const ToursSection = () => {
  return (
    <section className='tours'>
      <header className='content'>
        <h2>Popular Walking Tours</h2>
        <p>Perfect experiences for every traveler</p>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {tours.slice(0, 3).map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
};

export default ToursSection;
