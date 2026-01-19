import React from 'react';
import { Card } from '../ui/card';
import { Mail, Phone } from 'lucide-react';
import { PiWhatsappLogoFill } from 'react-icons/pi';
import { Link } from 'react-router';
import type { SocialProps } from '@/types/social';
import { iconMap } from '@/constants/iconMap';
import { getImageUrl } from '@/utils/images';
import { tourPhotoLists } from '@/data/gallery';
import { contactInfo } from '@/data/contact';
import { socials } from '@/data/socials';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='mb-16 md:px-20 px-5'>
        <div className='content'>
          <div className='md:col-span-8'>
            <h2 className='font-bold max-w-2xl'>
              Connecting you to the heart of Rwanda.
            </h2>
          </div>
          <div className='sub-content md:col-span-4'>
            <p>
              We are devoted to making your tour to Kigali more memorable and
              educative.
            </p>
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-12 gap-8 md:px-20'>
        <Card className='col-span-8 flex flex-col justify-between card pt-10!'>
          <section className='grid grid-cols-3 gap-4'>
            {tourPhotoLists.map((tourPhoto, index) => {
              const imageUrl = getImageUrl(tourPhoto)
              return (<Card key={index} className='p-3! h-60 shadow-xl bg-neutral-800 border-0 rounded-2xl'>
                <img src={imageUrl} alt={`tourPhoto-${index}`} className='w-full h-full rounded-2xl object-cover bg-center bg-no-repeat bg-cover' />
              </Card>
              )
            })}
          </section>
          <section className='w-full flex items-start justify-between'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg text-neutral-300'>Contact Us On</h3>
              <div className='flex items-center gap-2'>
                <Phone className='size-6' />
                <label className='text-lg'>{contactInfo.phone}</label>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='size-6' />
                <label className='text-lg'>{contactInfo.email}</label>
              </div>
              <div className='flex items-center gap-2'>
                <PiWhatsappLogoFill className='size-6' />
                <label className='text-lg'>{contactInfo.whatsapp}</label>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg text-neutral-300'>Follow Us On</h3>
              <div className='flex gap-3'>
                {socials.map(
                  ({ name, icon, url }: SocialProps, index: number) => {
                    const Icon = icon ? iconMap[icon] : null;
                    return (
                      <Link key={name} to={url}>
                        {Icon && <Icon className='text-2xl' />}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </section>
        </Card>
        <Card className='col-span-4 card'></Card>
      </div>
      <div className='text-neutral-200 text-lg mt-20'>
        &copy; 2026 Twija Africa Safari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
