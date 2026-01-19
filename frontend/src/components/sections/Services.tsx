import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { serviceLists } from '@/constants';
import type { ServiceIcon } from '@/types/service';
import { iconMap } from '@/constants/iconMap';

const Services = () => {
  return (
    <section className='services'>
      <div className='mb-16 md:px-20 px-5'>
        <div className='content'>
          <div className='md:col-span-6'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
              Unveiling Kigali's Charms with Twija Africa Safari
            </h2>
          </div>
          <div className='sub-content'>
            <p>
              **Twija Africa Safari** offers an unparalleled journey through the
              heart of Rwanda's captivating capital. Our expert local guides
              lead you on immersive experiences, revealing the city's rich
              history, vibrant culture, and breathtaking landscapes, one step at
              a time.
            </p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10 mb-12 px-5 md:px-0 w-[75%]'>
        {serviceLists.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon} // ← explicit
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: ServiceIcon;
} & React.ComponentPropsWithoutRef<'div'>;

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const Icon = icon ? iconMap[icon] : null;
  return (
    <Card className='h-full md:col-span-4 transition-all hover:shadow-lg hover:-translate-y-1 bg-neutral-900 text-white border-0'>
      <CardHeader className='pt-6 text-center flex flex-col items-center gap-4'>
        {Icon && <Icon className='mx-auto text-5xl text-green-600 mb-1' />}
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription className='text-[18px] leading-relaxed'>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Services;
