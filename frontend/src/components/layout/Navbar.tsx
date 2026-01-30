'use client';

import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { getImageUrl } from '@/utils/images';
import { useGSAP } from '@gsap/react';
import { Menu } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { Button } from '../ui/button';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { navLinks } from '@/data/navigation';

const Navbar = () => {
  const container = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { toggleSidebar } = useSidebar();
  const { pathname } = useLocation();

  // Route configurations
  const darkHeroRoutes = ['/', '/tours', '/kigali-experiences'];
  const lightHeroRoutes = ['/contact-us', '/book-tour'];

  const isTransparentInitial = [...darkHeroRoutes, ...lightHeroRoutes].includes(
    pathname,
  );
  const shouldStartWhiteText = darkHeroRoutes.includes(pathname);

  // Manual cleanup for route changes to prevent "ghost" triggers
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        // Kill specific navbar triggers by ID to avoid type comparison issues
        ScrollTrigger.getById('navbar-bg-scroll')?.kill();
        ScrollTrigger.getById('navbar-text-scroll')?.kill();
      }
    };
  }, [pathname]);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const navElements = [
        ...Array.from(nav.querySelectorAll('a')),
        ...Array.from(nav.querySelectorAll('button')),
        nav.querySelector('#title'),
      ];

      // CASE 1: Standard routes (Fixed white navbar)
      if (!isTransparentInitial) {
        gsap.set(nav, {
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.08)',
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
          backdropFilter: 'blur(12px)',
        });
        gsap.set(navElements, { color: '#000000' });
        return;
      }

      // CASE 2: Hero routes (Transparent -> Animated)
      const startTextColor = shouldStartWhiteText ? '#ffffff' : '#000000';

      // 1. Initial State
      gsap.set(nav, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        backdropFilter: 'blur(0px)',
      });
      gsap.set(navElements, { color: startTextColor });

      // 2. Background Animation
      gsap.to(nav, {
        scrollTrigger: {
          id: 'navbar-bg-scroll',
          trigger: document.body, // Fixed: Using element instead of string 'body'
          start: 'top top',
          end: '+=100px',
          scrub: 0.5,
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.1)',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
        ease: 'none',
      });

      // 3. Text Color Animation
      gsap.to(navElements, {
        scrollTrigger: {
          id: 'navbar-text-scroll',
          trigger: document.body, // Fixed: Using element instead of string 'body'
          start: 'top top',
          end: '+=100px',
          scrub: 0.5,
        },
        color: '#000000',
        ease: 'none',
      });
    },
    {
      scope: container,
      dependencies: [pathname, isTransparentInitial, shouldStartWhiteText],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={container} className='relative z-50'>
      <nav
        ref={navRef}
        className='fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-none'
      >
        <div className='flex flex-row w-full sm:max-w-7xl sm:mx-auto px-5 sm:px-8 items-center sm:justify-between relative z-10'>
          {/* Mobile Menu Toggle */}
          <Button
            variant='ghost'
            size='icon'
            className='size-7 sm:hidden'
            onClick={toggleSidebar}
          >
            <Menu className='text-inherit' />
          </Button>

          {/* Logo & Brand */}
          <Link
            to='/'
            className='flex items-center gap-3 focus:outline-none relative z-20'
          >
            <img
              src={getImageUrl('logo_bg.png')}
              alt='Logo'
              className='w-10 sm:w-12 rounded-xl'
            />
            <span id='title' className='font-bold text-lg sm:text-xl'>
              Kigali City Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center gap-8 relative z-20'>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.url ?? `#${link.id}`}
                  className='text-sm font-semibold transition-colors hover:text-green-600'
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
