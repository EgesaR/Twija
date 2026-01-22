'use client';

import React, { useState, useRef } from 'react';
import { Link } from 'react-router';
import { navLinks } from '@/constants';
import { getImageUrl } from '@/utils/images';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/dist/gsap';

// Shadcn UI Components
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      const initGSAP = async () => {
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        const navTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=150',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.registerPlugin(ScrollTrigger);

        // Scroll Animation - Light Theme & Removed Logo Scaling
        navTimeline
          .to('nav', {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
          })
          .fromTo(
            'nav a, nav button',
            {
              color: '#ffffff',
              duration: 0.5,
              ease: 'power1.inOut',
            },
            {
              color: '#000000',
              duration: 0.5,
              ease: 'power1.inOut',
            },
          );
      };

      initGSAP();
    },
    { scope: container },
  );

  useGSAP(() => {
    if (isOpen) {
      gsap.from('.mobile-link', {
        x: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  return (
    <div ref={container} className='relative z-100' suppressHydrationWarning>
      <nav
        className='fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto text-white'
        style={
          {
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
            isolation: 'isolate',
          } as React.CSSProperties
        }
      >
        <div className='max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between relative z-10'>
          {/* Logo Area - Scaling logic removed */}
          <Link
            to='/'
            className='flex items-center gap-3 focus:outline-none relative z-20 pointer-events-auto'
          >
            <img
              src={getImageUrl('logo_bg.png')}
              alt='Logo'
              className='w-12 sm:w-14 rounded-xl'
            />
            <span className='font-bold text-lg sm:text-xl'>
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

          {/* Mobile Sheet */}
          <div className='md:hidden relative z-20'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className='text-neutral-50 p-2 hover:bg-neutral-100 rounded-lg transition-colors pointer-events-auto'
                  aria-label='Toggle Menu'
                >
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='bg-white border-neutral-100 text-neutral-50 w-75'
              >
                <SheetHeader>
                  <SheetTitle className='text-neutral-50 text-left border-b pb-4'>
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-6 mt-10'>
                  {navLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.url ?? `#${link.id}`}
                      onClick={() => setIsOpen(false)}
                      className='mobile-link text-xl text-neutral-50 hover:text-indigo-600 transition-colors font-medium'
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
