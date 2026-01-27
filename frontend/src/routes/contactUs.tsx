'use client';

import React, { useRef, type FormEventHandler } from 'react';
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
} from 'react-hook-form';
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

type ContactFormProps = {
  register: UseFormRegister<ContactFormData>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
};

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

  const onSubmit: SubmitHandler<ContactFormData> = async (
    data: ContactFormData,
  ) => {
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
          className='w-full h-full bg-cover bg-center opacity-40 grayscale-20'
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
                <ContactForm
                  register={register}
                  onSubmit={handleSubmit(onSubmit)}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm = ({
  register,
  onSubmit,
  isSubmitting,
}: ContactFormProps) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <FormField label="01. What's your name?">
          <Input
            {...register('name')}
            placeholder='John Doe'
            className='shadow-none border-0 focus:ring-0!'
          />
        </FormField>

        <FormField label='02. Your email address'>
          <Input
            {...register('email')}
            type='email'
            placeholder='john@example.com'
            className='shadow-none border-0 focus:ring-0!'
          />
        </FormField>
      </div>

      <FormField label='03. What are you looking for?'>
        <Input
          {...register('subject')}
          placeholder='Tour inquiry, partnership…'
          className='shadow-none border-0 focus:ring-0!'
        />
      </FormField>

      <FormField label='04. Your message'>
        <Textarea
          {...register('message')}
          placeholder='Tell us more…'
          className='shadow-none border-0 focus:ring-0!'
        />
      </FormField>

      <Button
        type='submit'
        disabled={isSubmitting}
        className='bg-green-700 hover:bg-green-800 rounded-full px-24 h-12'
      >
        {isSubmitting ? (
          <Loader2 className='animate-spin' />
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </Button>
    </form>
  );
};

const FormField = ({
  label, children
}: { label: string, children: React.ReactNode }) => {
  return (
    <div className='space-y-2 border-b border-slate-400 focus-within:border-green-700 py-0.5'>
      <Label className='text-[10px] uppercase font-bold text-slate-500'>
        {label}
      </Label>
      {children}
    </div>
  );
}

export default ContactUs;
