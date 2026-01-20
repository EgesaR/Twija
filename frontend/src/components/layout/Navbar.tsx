// components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { navLinks } from '@/constants';
import { getImageUrl } from '@/utils/images';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/dist/gsap'; // Core GSAP is usually okay here

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
  const container = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      // 1. WE LOAD THE PLUGIN DYNAMICALLY INSIDE THE HOOK
      // This ensures the server NEVER sees the ScrollTrigger file.
      const setupAnimations = async () => {
        // Use the standard entry point, but only on the client
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // Your scroll animation
        gsap.to('nav', {
          backgroundColor: '#0f0f0fcc',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          '--logo-scale': 0.85,
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=200',
            scrub: 0.6,
          },
        });
      };

      setupAnimations();
    },
    { scope: container },
  );

  // Mobile menu stagger (This is already SSR safe because it's in a hook)
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
    <div ref={container}>
      <nav
        className='fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-500'
        style={
          {
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
            '--logo-scale': '1',
          } as React.CSSProperties
        }
      >
        <div className='max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-3 focus:outline-none'
            style={{
              transform: 'scale(var(--logo-scale))',
              transition: 'transform 0.3s ease',
            }}
          >
            <img
              src={getImageUrl('logo_bg.png')}
              alt='Logo'
              className='w-12 sm:w-16 rounded-xl'
            />
            <span className='font-bold text-lg sm:text-xl text-white'>
              Kigali City Tours
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.url ?? `#${link.id}`}
                  className='text-gray-200 hover:text-white text-sm font-medium'
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Sheet */}
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className='text-white p-2'>
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='bg-[#0f0f0f] border-white/10 text-white'
              >
                <SheetHeader>
                  <SheetTitle className='text-white'>Menu</SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-6 mt-10'>
                  {navLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.url ?? `#${link.id}`}
                      onClick={() => setIsOpen(false)}
                      className='mobile-link text-xl text-gray-300'
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
