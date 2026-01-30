import { useEffect, useState } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Compass,
  User,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AuthFormProps {
  type: 'login' | 'sign-up' | 'finish-setup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const actionData = useActionData() as any;
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  // 1. Define the config object separately
  const authConfigs = {
    login: {
      title: 'Welcome back, Explorer',
      subtitle: 'Login to manage your tours and destinations.',
      button: 'Sign In to Dashboard',
      icon: <Compass size={28} />,
    },
    'sign-up': {
      title: 'Join the Network',
      subtitle: 'Request admin access to host your experiences.',
      button: 'Submit Request',
      icon: <MapPin size={28} />,
    },
    'finish-setup': {
      title: 'Finalize Account',
      subtitle: 'Secure your account to begin managing tours.',
      button: 'Complete Setup',
      icon: <User size={28} />,
    },
  };

  useEffect(() => {
    if (actionData?.error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: actionData.error,
      });
    }

    if (actionData?.success) {
      toast({
        variant: 'success',
        title: 'Success!',
        description:
          type === 'sign-up'
            ? 'Your application has been submitted.'
            : 'Operation successful!',
      });
    }
  }, [actionData, type]);

  // 2. Safe lookup with a fallback to 'login' if type is invalid
  const config = authConfigs[type] || authConfigs.login;

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#F1F5F2] p-6'>
      <div className='w-full max-w-[480px] rounded-[2.5rem] bg-white p-10 shadow-[0_20px_50px_rgba(20,50,20,0.06)] border border-emerald-100/50'>
        {/* Header */}
        <div className='mb-10 text-center'>
          {/* config.icon is now safe because of the fallback above */}
          <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200'>
            {config.icon}
          </div>
          <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>
            {config.title}
          </h1>
          <p className='mt-2 text-sm text-slate-500'>{config.subtitle}</p>
        </div>

        <Form method='post' className='space-y-5'>
          {/* SIGN UP FIELDS (firstName, lastName) */}
          {type === 'sign-up' && (
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-xs font-bold uppercase tracking-wider text-slate-500 ml-1'>
                  First Name
                </label>
                <input
                  name='firstName'
                  placeholder='John'
                  className={cn(
                    'w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all',
                    actionData?.errors?.firstName && 'border-red-500',
                  )}
                />
                {actionData?.errors?.firstName && (
                  <p className='text-[10px] text-red-500 font-medium ml-1 italic'>
                    {actionData.errors.firstName[0]}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-bold uppercase tracking-wider text-slate-500 ml-1'>
                  Last Name
                </label>
                <input
                  name='lastName'
                  placeholder='Doe'
                  className={cn(
                    'w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all',
                    actionData?.errors?.lastName && 'border-red-500',
                  )}
                />
                {actionData?.errors?.lastName && (
                  <p className='text-[10px] text-red-500 font-medium ml-1 italic'>
                    {actionData.errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* EMAIL FIELD (login & sign-up) */}
          {type !== 'finish-setup' && (
            <div className='space-y-2'>
              <label className='text-xs font-bold uppercase tracking-wider text-slate-500 ml-1'>
                Email Address
              </label>
              <div className='relative'>
                <Mail
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                  size={18}
                />
                <input
                  name='email'
                  type='email'
                  placeholder='travel@agency.com'
                  className={cn(
                    'w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all',
                    actionData?.errors?.email && 'border-red-500',
                  )}
                />
              </div>
              {actionData?.errors?.email && (
                <p className='text-[10px] text-red-500 font-medium ml-1 italic'>
                  {actionData.errors.email[0]}
                </p>
              )}
            </div>
          )}

          {/* PASSWORD FIELD (login & finish-setup) */}
          {(type === 'login' || type === 'finish-setup') && (
            <div className='space-y-2'>
              <div className='flex justify-between items-center ml-1'>
                <label className='text-xs font-bold uppercase tracking-wider text-slate-500'>
                  {type === 'finish-setup' ? 'Create Password' : 'Password'}
                </label>
                {type === 'login' && (
                  <Link
                    to='/forgot-password'
                    title='Reset Password'
                    className='text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors'
                  >
                    Forgot?
                  </Link>
                )}
              </div>
              <div className='relative'>
                <Lock
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                  size={18}
                />
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className={cn(
                    'w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-12 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all',
                    actionData?.errors?.password && 'border-red-500',
                  )}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {actionData?.errors?.password && (
                <p className='text-[10px] text-red-500 font-medium ml-1 italic'>
                  {actionData.errors.password[0]}
                </p>
              )}
            </div>
          )}

          {/* CONFIRM PASSWORD (finish-setup only) */}
          {type === 'finish-setup' && (
            <div className='space-y-2'>
              <label className='text-xs font-bold uppercase tracking-wider text-slate-500 ml-1'>
                Confirm Password
              </label>
              <div className='relative'>
                <Lock
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                  size={18}
                />
                <input
                  name='confirmPassword'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className={cn(
                    'w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all',
                    actionData?.errors?.confirmPassword && 'border-red-500',
                  )}
                />
              </div>
              {actionData?.errors?.confirmPassword && (
                <p className='text-[10px] text-red-500 font-medium ml-1 italic'>
                  {actionData.errors.confirmPassword[0]}
                </p>
              )}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='group w-full rounded-2xl bg-emerald-600 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] shadow-xl shadow-emerald-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              <>
                {config.button}
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </>
            )}
          </button>
        </Form>

        {/* Footer Link */}
        <div className='mt-8 text-center text-sm text-slate-500 font-medium'>
          {type === 'login' ? (
            <p>
              New partner?{' '}
              <Link
                to='/auth/request'
                className='text-emerald-700 font-bold hover:underline underline-offset-4 decoration-emerald-200'
              >
                Apply for Access
              </Link>
            </p>
          ) : (
            <p>
              Back to{' '}
              <Link
                to='/auth/login'
                className='text-emerald-700 font-bold hover:underline underline-offset-4 decoration-emerald-200'
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
