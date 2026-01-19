import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import type { Tour } from '@/types/tour';

// ---------- Data ----------
const historyExperiences = [
  {
    title: 'Kigali Genocide Memorial',
    description:
      'A powerful place of remembrance and learning, dedicated to the victims of the 1994 Genocide against the Tutsi.',
    imageUrl: '/images/kigali-genocide.jpg',
    tourName: 'Kigali Genocide History Tour',
    tourLink: '/tours/kigali-genocide-history',
  },
  {
    title: 'Campaign Against Genocide Museum',
    description:
      "Located in the Parliament building, it tells the story of the RPF's campaign to stop the genocide.",
    imageUrl: '/images/campaign-museum.jpg',
    tourName: 'Kigali Genocide History Tour',
    tourLink: '/tours/kigali-genocide-history',
  },
  {
    title: 'Nyamata & Ntarama Memorials',
    description:
      'Preserved churches outside Kigali telling a powerful story of the genocide.',
    imageUrl: '/images/nyamata-ntarama.jpg',
    tourName: 'Kigali Genocide History Tour',
    tourLink: '/tours/kigali-genocide-history',
  },
];

const artsExperiences = [
  {
    title: 'Inema Arts Center',
    description:
      'A hub for contemporary African art, featuring works from Rwandan artists and hosting workshops.',
    imageUrl: '/images/inema-arts.jpg',
    tourName: 'Kigali Arts & Culture Experience',
    tourLink: '/tours/kigali-arts-culture',
  },
  {
    title: 'Niyo Arts Gallery',
    description:
      'A community-focused gallery showcasing local artists and providing a space for creativity.',
    imageUrl: '/images/niyo-gallery.jpg',
    tourName: 'Kigali Arts & Culture Experience',
    tourLink: '/tours/kigali-arts-culture',
  },
  {
    title: 'Kimironko Market',
    description:
      'The largest and busiest market in Kigali, perfect for local shopping.',
    imageUrl: '/images/kimironko.jpg',
    tourName: 'Kigali Arts & Culture Experience',
    tourLink: '/tours/kigali-arts-culture',
  },
];

const natureExperiences = [
  {
    title: 'Mount Kigali (Fazenda Sengha)',
    description:
      'Adventure activities like ziplining, horse riding, and quad biking with city views.',
    imageUrl: '/images/mount-kigali.jpg',
    tourName: 'Kigali Nature & Outdoor Adventure',
    tourLink: '/tours/kigali-nature',
  },
  {
    title: 'Nyandungu Urban Wetland Eco-Park',
    description:
      'Urban wetland with walking trails, birdwatching, and peaceful nature escapes.',
    imageUrl: '/images/nyandungu.jpg',
    tourName: 'Kigali Nature & Outdoor Adventure',
    tourLink: '/tours/kigali-nature',
  },
  {
    title: 'Umusambi Village',
    description:
      'Restored wetland sanctuary, home to rescued Grey Crowned Cranes and wildlife.',
    imageUrl: '/images/umusambi.jpg',
    tourName: 'Kigali Nature & Outdoor Adventure',
    tourLink: '/tours/kigali-nature',
  },
];

const modernExperiences = [
  {
    title: 'Kigali Convention Centre',
    description:
      "An iconic dome-shaped building and a key landmark of Kigali's modern skyline.",
    imageUrl: '/images/kigali-convention.jpg',
    tourName: 'Modern Kigali Highlights',
    tourLink: '/tours/modern-kigali',
  },
  {
    title: 'Hotel des Mille Collines',
    description:
      'Famously known as the "Hotel Rwanda," historic hotel that saved lives during the 1994 genocide.',
    imageUrl: '/images/hotel-mille-collines.jpg',
    tourName: 'Modern Kigali Highlights',
    tourLink: '/tours/modern-kigali',
  },
];

// ---------- Components ----------

const ExperienceCard = ({
  title,
  description,
  imageUrl,
  tourName,
  tourLink,
}: { title: string; description: string; imageUrl: string; tourName: string; tourLink: string }) => (
  <div className='border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col'>
    <img src={imageUrl} alt={title} className='h-48 w-full object-cover' />
    <div className='p-4 flex flex-col flex-1'>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <p className='text-sm text-gray-600 mb-4 flex-1'>{description}</p>
      <Button asChild variant='outline' className='mt-auto'>
        <a href={tourLink}>Included in: {tourName} →</a>
      </Button>
    </div>
  </div>
);

const ExperienceGrid = ({ experiences }: { experiences: any[] }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
    {experiences.map((exp) => (
      <ExperienceCard key={exp.title} {...exp} />
    ))}
  </div>
);

const SuggestedTours = ({ tours }: { tours: Tour[] }) => (
  <div className='mt-12'>
    <h2 className='text-2xl font-bold mb-4'>Suggested Tours</h2>
    <div className='flex flex-col sm:flex-row gap-4'>
      {tours.map((tour) => (
        <div
          key={tour.name}
          className='border rounded-lg shadow p-4 flex-1 flex flex-col justify-between'
        >
          <h3 className='font-semibold text-lg'>{tour.name}</h3>
          <p className='text-gray-500'>{tour.duration}</p>
          <Button asChild className='mt-2'>
            <a href={tour.link}>Book Now →</a>
          </Button>
        </div>
      ))}
    </div>
  </div>
);

// ---------- Page ----------

const KigaliExperiencesPage = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Page Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-2'>Kigali Experiences</h1>
        <p className='text-gray-600 text-lg'>
          Discover the best of Kigali’s history, culture, nature, and modern
          landmarks
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='history' className='w-full'>
        <TabsList className='grid grid-cols-4'>
          <TabsTrigger value='history'>History & Memorials</TabsTrigger>
          <TabsTrigger value='arts'>Arts & Culture</TabsTrigger>
          <TabsTrigger value='nature'>Nature & Outdoor</TabsTrigger>
          <TabsTrigger value='modern'>Modern Kigali</TabsTrigger>
        </TabsList>

        <TabsContent value='history'>
          <ExperienceGrid experiences={historyExperiences} />
          <SuggestedTours
            tours={[
              {
                name: 'Kigali Genocide History Tour',
                duration: 'Half Day',
                link: '/tours/kigali-genocide-history',
              },
              {
                name: 'Full-Day Kigali Cultural & Memorial Tour',
                duration: '1 Day',
                link: '/tours/kigali-cultural-memorial',
              },
            ]}
          />
        </TabsContent>

        <TabsContent value='arts'>
          <ExperienceGrid experiences={artsExperiences} />
          <SuggestedTours
            tours={[
              {
                name: 'Kigali Arts & Culture Experience',
                duration: 'Half Day',
                link: '/tours/kigali-arts-culture',
              },
            ]}
          />
        </TabsContent>

        <TabsContent value='nature'>
          <ExperienceGrid experiences={natureExperiences} />
          <SuggestedTours
            tours={[
              {
                name: 'Kigali Nature & Outdoor Adventure',
                duration: 'Half Day',
                link: '/tours/kigali-nature',
              },
            ]}
          />
        </TabsContent>

        <TabsContent value='modern'>
          <ExperienceGrid experiences={modernExperiences} />
          <SuggestedTours
            tours={[
              {
                name: 'Modern Kigali Highlights',
                duration: '2–3 Hours',
                link: '/tours/modern-kigali',
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KigaliExperiencesPage;
