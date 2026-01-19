import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getImageUrl } from '@/utils/images';
import { Send } from 'lucide-react';
import React from 'react';

const contactUs = () => {
  return (
    <div className='h-[110vh] relative'>
      <div
        className='absolute inset-0 bg-cover bg-top bg-no-repeat'
        style={{ backgroundImage: `url(${getImageUrl('kigali7.jpg')})` }}
      ></div>
      <div className='flex flex-col justify-center items-center gap-6 absolute inset-0 size-full pt-14 bg-linear-to-b from-black/20 via-black/30 to-black/50'>
        <h1 className='text-6xl'>Get in Touch</h1>
        <Card className='w-full max-w-xl bg-neutral-900/70 backdrop-blur-md text-white! border-0 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl'>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='name'>Your Name</Label>
                <Input id='name' type='text' placeholder='Your Name' required />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@example.com'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='subject'>Subject</Label>
                <Input
                  id='subject'
                  type='text'
                  placeholder='Tour Inquiry, Partnership, etc'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                  id='message'
                  placeholder='Your message here...'
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex-col'>
            <Button type='submit' className='w-full'>
              <Send />
              <label>Send Message</label>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default contactUs;
