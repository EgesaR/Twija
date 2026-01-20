import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/dist/SplitText';
import gsap from 'gsap';
import { getImageUrl } from '@/utils/images';

const Hero = () => {
  const bgImageUrl = getImageUrl('hero-bg.jpg');

  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const titleSplit = new SplitText('.title', { type: 'lines' });
    const subtitleSplit = new SplitText('.subtitle', { type: 'lines' });
    const paragraphSplit = new SplitText('.paragraph', { type: 'lines' });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from(subtitleSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
    })
      .from(
        titleSplit.lines,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1,
        },
        '-=0.7'
      )
      .from(
        paragraphSplit.lines,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6'
      )
      .from(
        buttonContainerRef.current,
        {
          opacity: 0,
          yPercent: 100,
          duration: 0.8,
        },
        '-=0.5'
      );
  });
  return (
    <section className='hero relative'>
      {bgImageUrl && (
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      )}
      <div className='hero-content'>
        <h3 className='subtitle'>Individual journeys through</h3>
        <h1 className='title'>Kigali's Vibrant Heart</h1>
        <p className='paragraph'>
          Curated Expeditions to Hidden Gems & Iconic Landmarks
        </p>
        <div ref={buttonContainerRef} className='btn-container'>
          <Button className="bg-green-700">Discover Your Adventure</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
