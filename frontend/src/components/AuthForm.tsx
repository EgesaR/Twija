'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
} from './ui/form';
import { Button } from './ui/button';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Link, redirect } from 'react-router';
import { logIn, signUp } from '@/lib/actions/user.action';

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      adminId: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "signup") {
        const newUser = await signUp(data)

        setUser(newUser)
      }

      if (type === "login") {
        const response = await logIn({
          email: data.email,
          password: data.password
        })

        if(response) redirect("/admin/dashboard")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <section className='auth-form'>
      <div className='flex flex-col gap-1 md:gap-3'>
        <h1 className='text-24 lg:text-36 font-semibold text-neutral-900'>
          {user ? 'Link Account' : type === 'login' ? 'Login' : 'Sign Up'}
        </h1>
        <p className='text-16 font-normal text-neutral-600'>
          {user
            ? 'Link your account to get started'
            : 'Please enter your details'}
        </p>
      </div>
      {user ? (
        <div className='flex flex-col gap-4'>{/* */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === 'signup' && (
                <>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label='First Name'
                      placeholder='Enter your first name'
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label='Last Name'
                      placeholder='Enter your last name'
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name='adminId'
                    label='AdminId'
                    placeholder='Enter your admin ID'
                  />
                </>
              )}
              <CustomInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter your email'
              />
              <CustomInput
                control={form.control}
                name='password'
                label='Password'
                placeholder='Enter your password'
              />
              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'login' ? (
                    'Login'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-neutral-600'>
              {type === 'login'
                ? "Don't have an account?"
                : 'Already have an accunt?'}
            </p>
            <Link
              className='form-link'
              to={type === 'login' ? '/admin/signup' : '/admin/login'}
            >
              {type === 'login' ? 'Sign Up' : 'Login'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
