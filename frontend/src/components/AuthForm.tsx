// components/AuthForm.tsx
'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher, Link } from 'react-router';
import { loginSchema, adminRequestSchema } from '@/lib/utils';
import { Form } from './ui/form';
import { Button } from './ui/button';
import CustomInput from './CustomInput';
import { Loader2 } from 'lucide-react';

const AuthForm = ({ type }: { type: 'login' | 'signup' }) => {
  const fetcher = useFetcher();
  const selectedSchema = type === 'login' ? loginSchema : adminRequestSchema;

  const form = useForm({
    resolver: zodResolver(selectedSchema),
    defaultValues: { email: '', password: '', firstName: '', lastName: '' },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    // Fix: Type-safe way to append data to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });
    fetcher.submit(formData, { method: 'post' });
  };

  return (
    <section className='auth-form'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {type === 'signup' && (
            <>
              <CustomInput
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='John'
              />
              <CustomInput
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='Doe'
              />
            </>
          )}
          <CustomInput control={form.control} name='email' label='Email' placeholder='someone@example.com' />
          {type === 'login' && (
            <CustomInput
              control={form.control}
              name='password'
              label='Password'
              type='password'
              placeholder='••••••••'
            />
          )}
          <Button type='submit' disabled={fetcher.state === 'submitting'}>
            {fetcher.state === 'submitting' ? (
              <Loader2 className='animate-spin' />
            ) : (
              type
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};
export default AuthForm;
