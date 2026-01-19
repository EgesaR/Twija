import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import { tourLists } from '@/constants';
import { getImageUrl } from '@/utils/images';
import { format } from 'date-fns';
import { ChevronDownIcon, Send } from 'lucide-react';
import React, { useState } from 'react';

const BookTour = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className='h-[140vh] relative'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${getImageUrl('b.jpg')})` }}
      ></div>
      <div className='flex flex-col justify-center items-center gap-6 absolute inset-0 size-full pt-8 bg-linear-to-b from-black/20 via-black/30 to-black/50'>
        <h1 className='text-6xl'>Book Your Kigali Walking Tour</h1>
        <Card className='w-full max-w-xl'>
          <CardHeader>
            <CardTitle className='text-xl'>
              Enter the information below
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='fullName'>Full Name</Label>
                <Input
                  id='fullName'
                  type='text'
                  placeholder='John Doe'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='johndoe@example.com'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input
                  id='phoneNumber'
                  type='tel'
                  placeholder='+250 788 XXX XXX'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='selectedTour'>Tour</Label>
                <Select defaultValue=''>
                  <SelectTrigger id='selectedTour' className='w-full'>
                    <SelectValue placeholder='-- Please select a tour --' />
                  </SelectTrigger>
                  <SelectContent>
                    {tourLists.map((tour, index) => (
                      <SelectItem key={index} value={tour.name}>
                        {tour.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='preferredTourDate'>Preferred Tour Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id='preferredTourDate'
                      variant={'outline'}
                      data-empty={!date}
                      className='w-full justify-between font-normal border-input data-[empty=true]:text-muted-foreground'
                    >
                      {date ? format(date, 'PPP') : 'Select date of travel'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto overflow-hidden p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={date}
                      captionLayout='dropdown'
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='preferredTourDate'>
                  Number of Participants
                </Label>
                <Input
                  id='numberOfParticipants'
                  type='number'
                  defaultValue={1}
                  placeholder='Number of Participants'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='message'>Special Requests (Optional)</Label>
                <Textarea
                  id='specialRequests'
                  placeholder='e.g. Dietary restrictions, Accessibility needs'
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex-col'>
            <Button type='submit' className='w-full'>
              <label>Confirm Booking</label>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const TourInput = () => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }

  const isValidDate = (date: Date | undefined) => {
    if (!date) return false;
    return !isNaN(date.getTime())
  }
  return <p></p>
}

export default BookTour;
