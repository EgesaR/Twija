'use client';

import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { navLinks } from '@/constants';
import { getImageUrl } from '@/utils/images';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/dist/gsap';
import { Menu } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { Button } from '../ui/button';

const Navbar = () => {
  const container = useRef<HTMLDivElement>(null);
  const { toggleSidebar } = useSidebar();
  const { pathname } = useLocation();

  const darkHeroRoutes = ['/', '/tours', '/kigali-experiences'];
  const lightHeroRoutes = ['/contact-us', '/book-tour'];

  const isTransparentInitial = [...darkHeroRoutes, ...lightHeroRoutes].includes(
    pathname,
  );
  const shouldStartWhiteText = darkHeroRoutes.includes(pathname);

  useGSAP(
    () => {
      const initGSAP = async () => {
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // Kill any existing triggers to prevent conflicts on route change
        ScrollTrigger.getAll().forEach((t) => t.kill());

        if (!isTransparentInitial) {
          gsap.set('nav', {
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.08)',
            paddingTop: '0.6rem',
            paddingBottom: '0.6rem',
          });
          gsap.set('nav a, nav button, #title', { color: '#000000' });
          return;
        }

        // 1. SET INITIAL LOAD STATE
        gsap.set('nav', {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          boxShadow: 'none',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        });

        const startColor = shouldStartWhiteText ? '#ffffff' : '#000000';
        gsap.set('nav a, nav button, #title', { color: startColor });

        // 2. CREATE TIMELINE WITH EXPLICIT FROM/TO
        const navTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            scrub: 0.5,
          },
        });

        navTimeline
          .to('nav', {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.1)',
            paddingTop: '0.6rem',
            paddingBottom: '0.6rem',
            ease: 'none',
          })
          .fromTo(
            'nav a, nav button, #title',
            { color: startColor }, // Forced start color based on route
            {
              color: '#000000', // Final scroll color
              duration: 0.3,
              ease: 'none',
            },
            0, // Start at the same time as the background
          );
      };

      initGSAP();
    },
    { scope: container, dependencies: [pathname] },
  );

  return (
    <div ref={container} className='relative z-50' suppressHydrationWarning>
      <nav className='fixed top-0 left-0 right-0 z-50 pointer-events-auto'>
        <div className='flex flex-row w-full sm:max-w-7xl sm:mx-auto px-5 sm:px-8 items-center sm:justify-between relative z-10'>
          <Button
            variant='ghost'
            size='icon'
            className='size-7 sm:hidden'
            onClick={toggleSidebar}
          >
            <Menu className='text-inherit' />
          </Button>

          <Link
            to='/'
            className='flex items-center gap-3 focus:outline-none relative z-20'
          >
            <img
              src={getImageUrl('logo_bg.png')}
              alt='Logo'
              className='w-10 sm:w-12 rounded-xl'
            />
            <span
              id='title'
              className='font-bold text-lg sm:text-xl transition-colors'
            >
              Kigali City Tours
            </span>
          </Link>

          <ul className='hidden md:flex items-center gap-8 relative z-20'>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.url ?? `#${link.id}`}
                  className='hover:text-green-600 text-sm font-semibold transition-colors'
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
