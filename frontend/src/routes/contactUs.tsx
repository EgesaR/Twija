'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Send, Loader2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getImageUrl } from '@/utils/images';
import { useToast } from '@/hooks/use-toast';
import { contactSchema, type ContactFormData } from '@/schema/contactSchema';

const ContactUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.5 },
      });
      tl.from('.animate-fade', { opacity: 0, y: 40, stagger: 0.1 });
    },
    { scope: containerRef },
  );

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: 'Message Sent!',
        description: "We'll respond shortly.",
        variant: 'success',
      });
      reset();
    } catch (error) {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  return (
    <div
      ref={containerRef}
      className='min-h-screen bg-[#F9F9F7] text-slate-900 selection:bg-green-100'
    >
      {/* Background Element - Soft & Organic */}
      <div className='absolute top-0 right-0 w-1/2 h-full hidden lg:block'>
        <div
          className='w-full h-full bg-cover bg-center opacity-40 grayscale-[20%]'
          style={{
            backgroundImage: `url(${getImageUrl('kigali7.jpg')})`,
            maskImage: 'linear-gradient(to left, black, transparent)',
          }}
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-6 lg:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
          {/* LEFT COLUMN: Header & Contact Details Grid */}
          <div className='lg:col-span-5 space-y-12'>
            <header className='animate-fade space-y-6'>
              <h1 className='text-6xl md:text-8xl font-serif font-light tracking-tight leading-[0.9]'>
                Get in <br />
                <span className='italic font-normal text-green-700'>touch</span>
              </h1>
              <p className='text-slate-500 text-lg max-w-sm font-light'>
                Planning a trip to Rwanda? Reach out and we’ll help you design
                an unforgettable experience.
              </p>
            </header>

            {/* Dribbble-style Contact Grid */}
            <div className='animate-fade grid grid-cols-1 sm:grid-cols-2 border-t border-l border-slate-200'>
              {[
                { icon: Mail, label: 'Email', val: 'hello@kigaliwalks.rw' },
                { icon: Phone, label: 'Phone', val: '+250 788 123 456' },
                { icon: MapPin, label: 'Location', val: 'KN 4 St, Kigali' },
                {
                  icon: ArrowRight,
                  label: 'Socials',
                  val: '@KigaliExpeditions',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className='p-8 border-r border-b border-slate-200 space-y-3 hover:bg-white transition-colors duration-500'
                >
                  <item.icon size={18} className='text-green-700' />
                  <div>
                    <p className='text-[10px] uppercase tracking-widest text-slate-400 font-bold'>
                      {item.label}
                    </p>
                    <p className='text-sm font-medium mt-1'>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Form */}
          <div className='lg:col-span-7'>
            <Card className='animate-fade border-none bg-transparent shadow-none'>
              <CardContent className='p-0'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='space-y-2 border-b border-slate-300 focus-within:border-green-700 transition-colors py-2'>
                      <Label className='text-[10px] uppercase tracking-tighter font-bold text-slate-400'>
                        01. What's your name?
                      </Label>
                      <Input
                        {...register('name')}
                        placeholder='John Doe'
                        className='border-none bg-transparent px-0 h-10 text-xl placeholder:text-slate-300 focus-visible:ring-0'
                      />
                    </div>
                    <div className='space-y-2 border-b border-slate-300 focus-within:border-green-700 transition-colors py-2'>
                      <Label className='text-[10px] uppercase tracking-tighter font-bold text-slate-400'>
                        02. Your email address
                      </Label>
                      <Input
                        {...register('email')}
                        type='email'
                        placeholder='john@example.com'
                        className='border-none bg-transparent px-0 h-10 text-xl placeholder:text-slate-300 focus-visible:ring-0'
                      />
                    </div>
                  </div>

                  <div className='space-y-2 border-b border-slate-300 focus-within:border-green-700 transition-colors py-2'>
                    <Label className='text-[10px] uppercase tracking-tighter font-bold text-slate-400'>
                      03. What are you looking for?
                    </Label>
                    <Input
                      {...register('subject')}
                      placeholder='Tour inquiry, partnership...'
                      className='border-none bg-transparent px-0 h-10 text-xl placeholder:text-slate-300 focus-visible:ring-0'
                    />
                  </div>

                  <div className='space-y-2 border-b border-slate-300 focus-within:border-green-700 transition-colors py-2'>
                    <Label className='text-[10px] uppercase tracking-tighter font-bold text-slate-400'>
                      04. Your message
                    </Label>
                    <Textarea
                      {...register('message')}
                      placeholder='Tell us more about your travel plans...'
                      className='border-none bg-transparent px-0 min-h-[100px] text-xl placeholder:text-slate-300 focus-visible:ring-0 resize-none'
                    />
                  </div>

                  <div className='pt-6'>
                    <Button
                      disabled={isSubmitting}
                      type='submit'
                      className='group relative bg-green-700 hover:bg-green-800 text-white rounded-full px-12 h-16 text-lg transition-all duration-500 overflow-hidden'
                    >
                      <span className='relative z-10 flex items-center gap-3'>
                        {isSubmitting ? (
                          <Loader2 className='animate-spin' size={20} />
                        ) : (
                          'Send Message'
                        )}
                        {!isSubmitting && (
                          <Send
                            size={18}
                            className='group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'
                          />
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
