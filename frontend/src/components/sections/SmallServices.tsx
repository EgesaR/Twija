import React, { useRef, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { PiStarFill, PiUsersThreeFill } from 'react-icons/pi';
import { Button } from '../ui/button';
import { serviceLists } from '@/constants';
import type { ServiceIcon, ServiceProps } from '@/types/service';
import { iconMap } from '@/constants/iconMap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmallServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalServiceSlides = serviceLists.length;

  const goToSlide = (index: number) => {
    const newIndex = (index + totalServiceSlides) % totalServiceSlides;

    setCurrentIndex(newIndex);
  };

  const getServiceSlideAt = (indexOffset: number) => {
    return serviceLists[
      (currentIndex + indexOffset + totalServiceSlides) % totalServiceSlides
    ];
  };

  const currentServiceSlide = getServiceSlideAt(0);

  return (
    <section className='w-full min-h-screen py-28 2xl:px-0 px-28 flex flex-col items-center gap-16'>
      <div>
        <Card className='bg-neutral-900 flex flex-row  gap-4 py-0.5! pl-0.5! pr-3! h-10 text-white border-0 rounded-md'>
          <Badge className='rounded-md h-full! gap-1.5! flex! bg-neutral-950'>
            <PiUsersThreeFill className='text-green-600' />
            <label className='text-base!'>Take a tours</label>
          </Badge>
          <div className='flex items-center gap-2 h-full'>
            <PiStarFill className='text-yellow-500' />
            <label>5K + People Satisfied</label>
          </div>
        </Card>
      </div>
      <div className='text-7xl h-40 w-full relative mt-12'>
        <h1 className='absolute top-0 left-0'>
          <label className='bg-green-500/70 rounded-xl px-4'>
            Twija Africa Safaris
          </label>{' '}
          will
        </h1>
        <h1 className='absolute bottom-[3%] right-[7.5%]'>
          Make Your Tour{' '}
          <label className='bg-sky-500/70 rounded-xl px-4'>Adventurous</label>
        </h1>
      </div>
      <div className='w-full h-[80vh] flex flex-col justify-between gap-6'>
        {currentServiceSlide && (
          <ServiceSlide key={currentServiceSlide.id} {...currentServiceSlide} />
        )}
        <div className='flex items-center justify-end'>
          <Card className='flex flex-row p-1! gap-1 bg-neutral-800'>
            <Button
              onClick={() => goToSlide(currentIndex - 1)}
              className={`${currentIndex == 0 ? 'bg-transparent' : 'hover:bg-neutral-950'}`}
            >
              <ArrowLeft />
              <label>Prev</label>
            </Button>
            <Button
              onClick={() => goToSlide(currentIndex + 1)}
              className={`${currentIndex == totalServiceSlides ? 'bg-transparent' : 'hover:bg-neutral-950'}`}
            >
              <ArrowRight />
              <label>Next</label>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SmallServices;

const ServiceSlide = ({ id, icon, title, description }: ServiceProps) => {
  const Icon = icon ? iconMap[icon] : null;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reset',
        },
        defaults: {
          ease: 'power3.out',
          duration: 0.8,
        },
      });

      tl.from(iconRef.current, {
        opacity: 0,
        y: 40,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
          },
          '-=0.4'
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 40,
          },
          '-=0.4'
        )
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 20,
          },
          '-=0.3'
        );

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        tl.kill();
      };
    },
    { dependencies: [id] }
  );
  return (
    <div ref={containerRef} className='w-full h-[90%] grid grid-cols-2 mt-8'>
      <div className='flex flex-col justify-between'>
        <div className='mt-16'>
          {Icon && (
            <div ref={iconRef}>
              <Icon id='icon' className='text-5xl text-green-400' />
            </div>
          )}
        </div>
        <div>
          <h1 className='text-5xl' ref={titleRef}>
            {title}
          </h1>
          <h2 className='pr-40 text-xl mt-4' ref={descRef}>
            {description}
          </h2>
        </div>
        <div ref={buttonRef} className='mb-5'>
          <Button className='opacty-100! bg-white text-black text-lg py-2 h-11 px-4 hover:bg-white/90'>
            Book Now
          </Button>
        </div>
      </div>
      <div className='opacity-0'>World</div>
    </div>
  );
};
