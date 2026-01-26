'use client';

import React, { useState, useRef } from 'react';
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

  const heroRoutes = ['/', '/book-tour', '/kigali-experiences', 'contact-us'];
  const hasHero = heroRoutes.includes(pathname);

  useGSAP(
    () => {
      if (!hasHero) {
        if (!hasHero) {
          // gsap.set('nav', {
          //   backgroundColor: 'rgba(255, 255, 255, 1)',
          //   backdropFilter: 'blur(12px)',
          //   boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
          //   paddingTop: '0.75rem',
          //   paddingBottom: '0.75rem',
          // });
          gsap.set('nav a, nav button, #title', { color: '#000000' });
          return;
        }
      }
      const initGSAP = async () => {
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        const navTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=150',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        navTimeline
          .to('nav', {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
          })
          .fromTo(
            'nav a, nav button, #title',
            {
              color: '#ffffff',
              duration: 0.3,
              ease: 'power1.inOut',
            },
            {
              color: '#000000',
              duration: 0.3,
              ease: 'power1.inOut',
            },
            0,
          );
      };

      initGSAP();
    },
    { scope: container, dependencies: [pathname] },
  );

  return (
    <div ref={container} className='relative z-50' suppressHydrationWarning>
      <nav
        className={`ixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto ${
          hasHero ? 'text-white' : 'text-black'
        }`}
        style={{ paddingTop: '0.6rem', paddingBottom: '0.6rem' }}
      >
        <div className='flex flex-row w-full sm:max-w-7xl sm:mx-auto px-5 sm:px-8 items-center sm:justify-between relative z-10'>
          <Button
            data-sidebar='trigger'
            data-slot='sidebar-trigger'
            variant='ghost'
            size='icon'
            className='size-7 sm:hidden'
            onClick={() => {
              toggleSidebar();
            }}
          >
            <Menu />
          </Button>
          <Link
            to='/'
            className='flex items-center gap-3 focus:outline-none relative z-20 pointer-events-auto'
          >
            <img
              src={getImageUrl('logo_bg.png')}
              alt='Logo'
              className='w-12 sm:w-14 rounded-xl'
            />
            <span id='title' className='font-bold text-lg sm:text-xl'>
              Kigali City Tours
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className='hidden md:flex items-center gap-8 relative z-20'>
            {navLinks.map((link) => (
              <li key={link.id} className='pointer-events-auto'>
                <Link
                  to={link.url ?? `#${link.id}`}
                  className='text-neutral-50 hover:text-indigo-600 text-sm font-medium transition-colors'
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
