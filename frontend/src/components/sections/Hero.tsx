'use client';

import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { useGSAP } from '@gsap/react';
import { getImageUrl } from '@/utils/images';
// IMPORT FROM YOUR CENTRALIZED LIB
import { gsap, SplitText } from '@/lib/gsap';

const Hero = () => {
  const bgImageUrl = getImageUrl('hero-bg.jpg');
  const heroRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Initialize SplitText on the elements
      // We use context/scope (heroRef) to ensure we target the right elements
      const subtitleSplit = new SplitText('.subtitle', {
        type: 'lines',
        linesClass: 'overflow-hidden',
      });
      const titleSplit = new SplitText('.title', {
        type: 'lines',
        linesClass: 'overflow-hidden',
      });
      const paragraphSplit = new SplitText('.paragraph', {
        type: 'lines',
        linesClass: 'overflow-hidden',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
      });

      // 2. Animate the 'lines' within the split text
      tl.from(subtitleSplit.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      })
        .from(
          titleSplit.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
          },
          '-=1',
        ) // Overlay with previous animation
        .from(
          paragraphSplit.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
          },
          '-=0.9',
        )
        .from(
          buttonContainerRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
          },
          '-=0.8',
        );

      // Cleanup function: Revert SplitText when component unmounts
      return () => {
        subtitleSplit.revert();
        titleSplit.revert();
        paragraphSplit.revert();
      };
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className='hero relative min-h-screen flex items-center overflow-hidden bg-black'
    >
      {bgImageUrl && (
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60'
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      )}

      <div className='hero-content relative z-10 container mx-auto px-6 md:px-20 text-white'>
        <h3 className='subtitle'>Individual journeys through</h3>
        <h1 className='title'>Kigali's Vibrant Heart</h1>
        <p className='paragraph'>
          Curated Expeditions to Hidden Gems & Iconic Landmarks
        </p>
        <div ref={buttonContainerRef} className='btn-container'>
          <Button className='bg-green-700 hover:bg-green-800 text-white px-8 py-6 rounded-full text-lg transition-transform hover:scale-105'>
            Discover Your Adventure
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
