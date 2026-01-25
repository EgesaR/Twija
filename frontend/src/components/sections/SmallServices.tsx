import React, { useRef, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { PiStarFill, PiUsersThreeFill } from 'react-icons/pi';
import { Button } from '../ui/button';
import { serviceLists } from '@/constants';
import type { ServiceProps } from '@/types/service';
import { iconMap } from '@/constants/iconMap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmallServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainContainer = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const totalServiceSlides = serviceLists.length;

  // Header Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainer.current,
          start: 'top 80%',
        },
      });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out',
      }).from(
        'h1',
        {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4',
      );
    },
    { scope: mainContainer },
  );

  const goToSlide = (index: number) => {
    const newIndex = (index + totalServiceSlides) % totalServiceSlides;
    setCurrentIndex(newIndex);
  };

  const currentServiceSlide = serviceLists[currentIndex];

  return (
    <section
      ref={mainContainer}
      className='w-full min-h-screen py-16 md:py-28 px-6 md:px-28 flex flex-col items-center gap-10 md:gap-16 overflow-hidden'
    >
      {/* Top Badge Card */}
      <div ref={badgeRef}>
        <Card className='bg-neutral-100 flex flex-row gap-4 py-1 px-3 pl-1! h-10 text-black border-0 rounded-md items-center'>
          <Badge className='rounded-md h-8 gap-1.5 flex bg-neutral-200 text-black border-0'>
            <PiUsersThreeFill className='text-green-600' />
            <span className='text-xs md:text-sm font-medium'>Take a tour</span>
          </Badge>
          <div className='flex items-center gap-2'>
            <PiStarFill className='text-yellow-500' />
            <span className='text-xs md:text-sm whitespace-nowrap'>
              5K + People Satisfied
            </span>
          </div>
        </Card>
      </div>

      {/* Main Responsive Heading */}
      <div
        ref={headingRef}
        className='w-full flex flex-col gap-4 text-center md:text-left'
      >
        <h1 className='text-3xl md:text-7xl font-bold leading-tight'>
          <span className='bg-green-500/70 rounded-xl px-4 inline-block mb-2'>
            Twija Africa Safaris
          </span>{' '}
          will
        </h1>
        <h1 className='text-4xl md:text-7xl font-bold leading-tight md:self-end'>
          Make Your Tour{' '}
          <span className='bg-sky-500/70 rounded-xl px-4 inline-block mt-2'>
            Adventurous
          </span>
        </h1>
      </div>

      <div className='w-full flex flex-col justify-between gap-6'>
        {currentServiceSlide && (
          <ServiceSlide key={currentServiceSlide.id} {...currentServiceSlide} />
        )}

        {/* Navigation */}
        <div className='flex items-center justify-center md:justify-end mt-8'>
          <Card className='flex flex-row p-1 gap-1 bg-neutral-100 border-neutral-200'>
            <Button
              variant='ghost'
              onClick={() => goToSlide(currentIndex - 1)}
              className='text-black bg-neutral-200 hover:bg-neutral-300 transition-colors'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              <span>Prev</span>
            </Button>
            <Button
              variant='ghost'
              onClick={() => goToSlide(currentIndex + 1)}
              className='text-black bg-neutral-200 hover:bg-neutral-300 transition-colors'
            >
              <span>Next</span>
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

const ServiceSlide = ({ id, icon, title, description }: ServiceProps) => {
  const Icon = icon ? iconMap[icon] : null;
  const slideRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, slideRef);
    return () => ctx.revert();
  }, [id]);

  return (
    <div
      ref={slideRef}
      className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-8 min-h-100'
    >
      <div className='flex flex-col justify-center md:justify-between space-y-6'>
        <div className='animate-item'>
          {Icon && <Icon className='text-5xl md:text-6xl text-green-500' />}
        </div>

        <div className='space-y-4'>
          <h2 className='text-4xl md:text-6xl font-bold animate-item'>
            {title}
          </h2>
          <p className='text-lg md:text-xl text-neutral-600 max-w-lg animate-item leading-relaxed'>
            {description}
          </p>
        </div>

        <div className='animate-item'>
          <Button className='bg-green-600 text-white text-lg py-6 px-8 hover:bg-green-700 transition-all rounded-full'>
            Book Now
          </Button>
        </div>
      </div>

      {/* Right side placeholder - can be replaced with an image */}
      <div className='hidden md:flex items-center justify-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200'>
        <p className='text-neutral-400 font-medium'>
          Image Preview for {title}
        </p>
      </div>
    </div>
  );
};

export default SmallServices;
