// components/Navbar.tsx
import { navLinks } from '@/constants';
import React from 'react';
import { Link } from 'react-router';
import { getImageUrl } from '@/utils/images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useGSAP(() => {
    // Simple but very smooth glass morphism effect on scroll
    gsap.to('nav', {
      backgroundColor: '#0f0f0fcc', // semi-transparent black
      backdropFilter: 'blur(12px)',
      boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      duration: 0.8,
      ease: 'power2.out',

      scrollTrigger: {
        trigger: 'body',
        start: 'top top', // start as soon as scrolling begins
        end: '+=250', // complete effect after 250px of scroll
        scrub: 0.6, // smooth follow-scroll feel (0.6s delay)
        // markers: true,           // uncomment for debugging
      },
    });

    // Optional: slight shrink + logo adjustment when scrolled
    gsap.to('nav', {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      '--logo-scale': 0.85, // we'll use css var
      duration: 0.7,
      ease: 'power2.out',

      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '+=250',
        scrub: 0.6,
      },
    });
  }, []);

  return (
    <nav
      className='
        fixed top-0 left-0 right-0 z-50 
        bg-transparent transition-all duration-500
      '
      style={
        {
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          '--logo-scale': '1',
        } as React.CSSProperties
      }
    >
      <div className='max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between'>
        {/* Logo + Brand */}
        <Link
          to='/'
          className='flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform'
          style={{ transform: 'scale(var(--logo-scale))' }}
        >
          <img
            src={getImageUrl('logo_bg.png')}
            alt='Kigali City Tours Logo'
            className='w-14 sm:w-16 md:w-20 rounded-xl object-contain transition-all'
          />
          <span
            className='
            font-semibold text-lg sm:text-xl 
            text-white tracking-tight
          '
          >
            Kigali City Tours
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-8 lg:gap-10'>
          {navLinks.map((link: { id: string; title: string; url?: string }) => (
            <li key={link.id}>
              <Link
                to={link.url ?? `#${link.id}`}
                className='
                  relative text-gray-200 hover:text-white 
                  text-base font-medium transition-colors
                  after:absolute after:bottom-[-4px] after:left-0
                  after:h-[2px] after:w-0 after:bg-white
                  after:transition-all after:duration-300
                  hover:after:w-full
                '
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button (you can expand later) */}
        <button className='md:hidden text-white focus:outline-none'>
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
