import React, { useRef } from 'react';
import { Card } from '../ui/card';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { PiWhatsappLogoFill } from 'react-icons/pi';
import { Link } from 'react-router';
import type { SocialProps } from '@/types/social';
import { iconMap } from '@/constants/iconMap';
import { getImageUrl } from '@/utils/images';
import { tourPhotoLists } from '@/data/gallery';
import { contactInfo } from '@/data/contact';
import { socials } from '@/data/socials';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });

      tl.from('.footer-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          '.footer-card-main',
          {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .from(
          '.footer-card-side',
          {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.8',
        )
        .from(
          '.gallery-item',
          {
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.5',
        );
    },
    { scope: footerRef, revertOnUpdate: false },
  );

  return (
    <footer
      ref={footerRef}
      className='footer bg-white pt-20 pb-10 overflow-hidden'
    >
      {/* Top Section: Branding & Mission */}
      <div className='mb-16 md:px-20 px-5'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-end'>
          <div className='md:col-span-8 footer-title'>
            <h2 className='text-3xl md:text-5xl font-bold max-w-2xl text-slate-900 tracking-tight'>
              Connecting you to the{' '}
              <span className='text-green-600'>heart of Rwanda.</span>
            </h2>
          </div>
          <div className='md:col-span-4 footer-title'>
            <p className='text-slate-600 text-lg leading-relaxed'>
              We are devoted to making your tour to Kigali more memorable,
              educative, and deeply personal.
            </p>
          </div>
        </div>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:px-20 px-5'>
        {/* Main Card: Gallery & Contact */}
        <Card className='col-span-1 md:col-span-8 flex flex-col justify-between p-6 md:p-10 bg-slate-50 border-slate-100 rounded-[2.5rem] footer-card-main shadow-sm'>
          {/* Responsive Gallery */}
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
            {tourPhotoLists.slice(0, 3).map((tourPhoto, index) => {
              const imageUrl = getImageUrl(tourPhoto);
              return (
                <Card
                  key={index}
                  className='gallery-item group relative overflow-hidden h-48 md:h-60 p-3 border-0 rounded-2xl shadow-lg'
                >
                  <img
                    src={imageUrl}
                    alt={`tourPhoto-${index}`}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl'
                  />
                  <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </Card>
              );
            })}
          </section>

          {/* Contact & Socials Split */}
          <section className='w-full flex flex-col md:flex-row items-start justify-between gap-8'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-bold uppercase tracking-widest text-slate-400'>
                Contact Us
              </h3>
              <div className='space-y-3'>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className='flex items-center gap-3 text-slate-700 hover:text-green-600 transition-colors group'
                >
                  <div className='p-2 bg-white rounded-lg shadow-sm group-hover:bg-green-50'>
                    <Phone size={18} />
                  </div>
                  <span className='text-lg font-medium'>
                    {contactInfo.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className='flex items-center gap-3 text-slate-700 hover:text-green-600 transition-colors group break-all'
                >
                  <div className='p-2 bg-white rounded-lg shadow-sm group-hover:bg-green-50'>
                    <Mail size={18} />
                  </div>
                  <span className='text-lg font-medium'>
                    {contactInfo.email}
                  </span>
                </a>
                <a
                  href='#'
                  className='flex items-center gap-3 text-slate-700 hover:text-green-600 transition-colors group'
                >
                  <div className='p-2 bg-white rounded-lg shadow-sm group-hover:bg-green-50'>
                    <PiWhatsappLogoFill size={18} />
                  </div>
                  <span className='text-lg font-medium'>
                    {contactInfo.whatsapp}
                  </span>
                </a>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-bold uppercase tracking-widest text-slate-400'>
                Follow the Journey
              </h3>
              <div className='flex gap-4'>
                {socials.map(({ name, icon, url }: SocialProps) => {
                  const Icon = icon ? iconMap[icon] : null;
                  return (
                    <Link
                      key={name}
                      to={url}
                      className='p-3 bg-white rounded-xl shadow-sm text-slate-700 hover:bg-slate-900 hover:text-white hover:-translate-y-1 transition-all duration-300'
                    >
                      {Icon && <Icon className='text-xl' />}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </Card>

        {/* Side Card: Newsletter or Quick Action */}
        <Card className='col-span-1 md:col-span-4 p-8 bg-green-600 rounded-[2.5rem] footer-card-side flex flex-col justify-between text-white border-0 shadow-xl shadow-green-100'>
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold'>
              Ready for your next adventure?
            </h3>
            <p className='text-green-50 opacity-90'>
              Join our newsletter to receive curated travel guides and exclusive
              tour offers.
            </p>
          </div>
          <div className='space-y-4 mt-8'>
            <input
              type='email'
              placeholder='Your email address'
              className='w-full px-4 py-3 rounded-xl bg-green-700 border-green-500 text-white placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-white/50'
            />
            <button className='w-full py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2'>
              Subscribe <ExternalLink size={16} />
            </button>
          </div>
        </Card>
      </div>

      <div className='md:px-20 px-6 border-t border-slate-100 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500'>
        <p className='text-sm font-medium'>
          &copy; 2026 Twija Africa Safari. Designed with ❤️ for Rwanda.
        </p>
        <div className='flex gap-8 text-xs font-bold uppercase tracking-widest'>
          <Link to='/privacy' className='hover:text-slate-900'>
            Privacy Policy
          </Link>
          <Link to='/terms' className='hover:text-slate-900'>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
