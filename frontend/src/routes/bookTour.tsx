'use client';

import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  CalendarIcon,
  Users,
  ChevronRight,
  Loader2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  useForm,
  type SubmitHandler,
  Controller,
  type UseFormRegister,
  type Control,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { tourLists } from '@/constants';
import { getImageUrl } from '@/utils/images';
import { bookingSchema, type BookingFormData } from '@/schema/bookingSchema';

const BookTour = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { participants: 1 },
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.2 },
      });
      tl.from('.form-side', { x: 50, opacity: 0 })
        .from('.info-stagger', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.8')
        .from('.input-anim', { x: 20, opacity: 0, stagger: 0.05 }, '-=1');
    },
    { scope: containerRef },
  );

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Booking Request Sent!',
      description:
        "We've received your request and will contact you shortly to confirm.",
      variant: 'success',
    });
  };

  return (
    <div
      ref={containerRef}
      className='h-screen bg-[#FDFDFB] flex flex-col lg:flex-row'
    >
      <LeftInfo />
      <iframe src="https://store.pesapal.com/twijaafricasafari" className="form-side lg:w-[60%] bg-white p-8 pb-0 lg:p-24 lg:pb-0 flex items-center h-120 sm:h-full" />
    </div>
  );
};

const LeftInfo = () => (
  <div
    className='
      relative 
      lg:w-[40%] 
      h-[60vh]       /* taller on mobile */
      lg:min-h-screen    /* full height on desktop */
      overflow-hidden
      pt-12 lg:pt-32     /* padding top to push content below navbar */
      pb-4 lg:pb-16     /* padding bottom */
    '
  >
    {/* Background image */}
    <div
      className='absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110'
      style={{ backgroundImage: `url(${getImageUrl('b.jpg')})` }}
    />
    <div className='absolute inset-0 bg-black/40 backdrop-blur-[2px]' />

    <div className='relative z-10 h-full flex flex-col justify-between p-8 pb-4 lg:p-16 text-white'>
      <div className='space-y-4 mt-8'>
        <div className='info-stagger inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm border border-white/30'>
          <Sparkles size={14} className='text-amber-300' />
          <span className='font-medium tracking-wide uppercase text-[10px]'>
            Experience Rwanda
          </span>
        </div>
        <h1 className='info-stagger text-5xl lg:text-7xl font-serif leading-[0.9] tracking-tighter'>
          Reserve your <br />
          <span className='italic font-light'>adventure.</span>
        </h1>
      </div>

      <div className='info-stagger space-y-6 max-w-sm'>
        <div className='flex gap-4'>
          <MapPin className='text-green-400 shrink-0' />
          <p className='text-white/80 text-sm'>
            Discover hidden gems through the eyes of local experts in the heart
            of Kigali.
          </p>
        </div>
      </div>
    </div>
  </div>
);


type RightFormProps = {
  register: UseFormRegister<BookingFormData>;
  control: Control<BookingFormData>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  errors: any;
};

const RightForm = ({
  register,
  control,  
  onSubmit,
  isSubmitting,
  errors,
}: RightFormProps) => {
  return (
    <div className='form-side lg:w-[60%] bg-white p-8 lg:p-24 flex items-center'>
      <div className='w-full max-w-2xl mx-auto'>
        <header className='mb-12'>
          <h2 className='text-3xl font-serif text-slate-900 mb-2'>
            Booking Details
          </h2>
          <p className='text-slate-500'>
            Fill in the details below to secure your spot.
          </p>
        </header>

        <form onSubmit={onSubmit} className='space-y-8'>
          {/* Full Name & Email */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <FormField label='Full Name'>
              <Input
                {...register('fullName')}
                placeholder='Jane Cooper'
                className='shadow-none border-0 focus:ring-0!'
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
              )}
            </FormField>

            <FormField label='Email Address'>
              <Input
                {...register('email')}
                type='email'
                placeholder='jane@example.com'
                className='shadow-none border-0 focus:ring-0!'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </FormField>
          </div>

          {/* Tour & Date */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <FormField label='Select Your Tour'>
              <Select {...register('tour')}>
                <SelectTrigger className='h-full! border-0 w-full rounded-none px-0 text-lg focus:ring-0 bg-transparent py-0! mb-0! shadow-none'>
                  <SelectValue placeholder='Choose a tour' />
                </SelectTrigger>
                <SelectContent className='rounded-xl border-slate-100 shadow-2xl'>
                  {tourLists.map((tour, index) => (
                    <SelectItem key={index} value={tour.name}>
                      {tour.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tour && (
                <p className='text-red-500 text-sm'>{errors.tour.message}</p>
              )}
            </FormField>

            <FormField label='Travel Date'>
              <Controller
                name='date'
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full h-12 justify-start border-0 shadow-none rounded-none px-0 text-lg font-normal focus:ring-0 bg-transparent hover:bg-transparent hover:cursor-text'
                      >
                        <CalendarIcon className='mr-3 h-5 w-5 text-slate-400' />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span className='text-slate-300'>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto p-0 border-none shadow-2xl rounded-2xl overflow-hidden'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && (
                <p className='text-red-500 text-sm'>{errors.date.message}</p>
              )}
            </FormField>
          </div>

          {/* Participants & Phone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <FormField label='Participants' className="">
              <div className='flex items-end gap-4 h-full'>
                <Users size={20} className='text-slate-400 h-full' />
                <Input
                  type='number'
                  min={1}
                  {...register('participants', { valueAsNumber: true })}
                  className='shadow-none border-0 focus:ring-0! h-full'
                />
              </div>
              {errors.participants && (
                <p className='text-red-500 text-sm'>
                  {errors.participants.message}
                </p>
              )}
            </FormField>

            <FormField label='Phone Number'>
              <Input
                {...register('phone')}
                placeholder='+250 ...'
                className='shadow-none border-0 focus:ring-0! bg-transparent'
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </FormField>
          </div>

          {/* Special Requests */}
          <FormField label='Special Requests'>
            <Textarea
              {...register('specialRequests')}
              placeholder='Any dietary requirements or accessibility needs?'
              className='shadow-none border-0 focus:ring-0! resize-none'
            />
          </FormField>

          {/* Submit */}
          <div className='pt-8'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-green-700 hover:bg-green-800 text-white rounded-full text-lg font-medium transition-all duration-500 shadow-md h-12'
            >
              {isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : (
                <span className='flex items-center gap-3'>
                  Confirm Booking <ChevronRight size={20} />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string
};

const FormField = ({ label, children, className }: FormFieldProps) => (
  <div
    className={`space-y-2 border-b border-slate-400 focus-within:border-green-700 py-0.5 flex flex-col relative group ${className}`}
  >
    <Label className='text-[10px] uppercase tracking-widest font-bold text-slate-500 group-focus-within:text-green-700'>
      {label}
    </Label>
    {children}
  </div>
);

export default BookTour;
