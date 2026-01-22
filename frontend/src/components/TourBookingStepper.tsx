'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperPanel,
  StepperContent,
} from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/multi-select';
import { Card } from '@/components/ui/card'; // Added for grounding

import {
  User,
  Map,
  CreditCard,
  ClipboardList,
  Check,
  LoaderCircle,
  Landmark,
  Mountain,
  Waves,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

const steps = [
  { title: 'Details', icon: User },
  { title: 'Tours', icon: Map },
  { title: 'Payment', icon: CreditCard },
  { title: 'Preview', icon: ClipboardList },
];

const tourOptions = [
  {
    heading: 'History & Culture',
    options: [
      { label: 'Genocide Memorial Tour', value: 'memorial', icon: Landmark },
      { label: 'Kigali City Heritage Walk', value: 'heritage', icon: Landmark },
    ],
  },
  {
    heading: 'Nature & Adventure',
    options: [
      { label: 'Volcanoes National Park', value: 'volcanoes', icon: Mountain },
      { label: 'Lake Kivu Escape', value: 'kivu', icon: Waves },
    ],
  },
];

export default function TourBookingStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    tours: [] as string[],
    cardNumber: '',
  });

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <Stepper
        value={currentStep}
        onValueChange={setCurrentStep}
        indicators={{
          completed: <Check className='size-4' />,
          loading: <LoaderCircle className='size-4 animate-spin' />,
        }}
        className='space-y-8'
      >
        {/* --- STEPPER NAVIGATION --- */}
        <StepperNav className='bg-muted/50 p-4 rounded-lg shadow-md relative'>
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className='relative flex-1 items-start'
            >
              <StepperTrigger
                className='flex flex-col items-center justify-center gap-2.5 grow'
                asChild
              >
                <StepperIndicator className='size-10! p-0! m-0! [&_div]:p-0! [&_div]:size-full [&_div]:translate-x-2.5 '>
                  <step.icon className='size-5 bg-green' />
                </StepperIndicator>
                <div className='flex flex-col items-center! gap-1'>
                  <div className='text-[10px] font-semibold uppercase text-muted-foreground'>
                    Step {index + 1}
                  </div>
                  <StepperTitle className='text-center text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground'>
                    {step.title}
                  </StepperTitle>
                  <div>
                    <Badge
                      variant='primary'
                      size='sm'
                      appearance='light'
                      className='hidden group-data-[state=active]/step:inline-flex'
                    >
                      In Progress
                    </Badge>
                    <Badge
                      variant='success'
                      size='sm'
                      appearance='light'
                      className='hidden group-data-[state=completed]/step:inline-flex'
                    >
                      Completed
                    </Badge>
                    <Badge
                      variant='secondary'
                      size='sm'
                      className='hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground'
                    >
                      Pending
                    </Badge>
                  </div>
                </div>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className='absolute p-0! py-1! right-[-40.5%]! top-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500 -z-1' />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        {/* --- FORM PANEL --- */}
        <Card className='p-6 sm:p-8 shadow-lg border-muted/60 bg-card relative overflow-hidden'>
          {/* Progress Bar moved inside the card for a "unified" look */}
          <div className='absolute top-0 left-0 w-full h-1 bg-muted'>
            <motion.div
              className='h-full bg-primary'
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode='wait'>
            <StepperPanel>
              {/* STEP 1 */}
              {currentStep === 1 && (
                <StepperContent key='step-1' value={1}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='space-y-4'
                  >
                    <div className='space-y-2'>
                      <h2 className='text-xl font-bold'>
                        Tell us about you 👋
                      </h2>
                      <p className='text-sm text-muted-foreground'>
                        Basic details to get started.
                      </p>
                    </div>

                    <div className='grid gap-4 mt-4'>
                      <Input
                        placeholder='Full name'
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                      <Input
                        placeholder='Email address'
                        type='email'
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                  </motion.div>
                </StepperContent>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <StepperContent key='step-2' value={2}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='space-y-4'
                  >
                    <div className='space-y-2'>
                      <h2 className='text-xl font-bold'>
                        Choose adventures 🌍
                      </h2>
                      <p className='text-sm text-muted-foreground'>
                        Pick your dream Kigali experiences.
                      </p>
                    </div>

                    <div className='pt-2'>
                      <MultiSelect
                        options={tourOptions}
                        onValueChange={(tours) => setForm({ ...form, tours })}
                        placeholder='Select tours...'
                      />
                    </div>

                    {form.tours.length > 0 && (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className='rounded-lg border bg-primary/5 p-3 text-sm text-primary border-primary/20'
                      >
                        ✨ {form.tours.length} experience
                        {form.tours.length > 1 ? 's' : ''} selected
                      </motion.div>
                    )}
                  </motion.div>
                </StepperContent>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <StepperContent key='step-3' value={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='space-y-4'
                  >
                    <div className='space-y-2'>
                      <h2 className='text-xl font-bold'>Secure your spot 🔐</h2>
                      <p className='text-sm text-muted-foreground'>
                        Your payment is safe with us.
                      </p>
                    </div>

                    <Input
                      placeholder='Card number'
                      className='max-w-sm'
                      value={form.cardNumber}
                      onChange={(e) =>
                        setForm({ ...form, cardNumber: e.target.value })
                      }
                    />
                  </motion.div>
                </StepperContent>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <StepperContent key='step-4' value={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='space-y-6'
                  >
                    <h2 className='text-xl font-bold'>Review Summary 🧭</h2>

                    <div className='rounded-lg border bg-muted/30 p-4 space-y-3 text-sm'>
                      <div className='flex justify-between border-b pb-2'>
                        <span className='text-muted-foreground'>Name:</span>
                        <span className='font-medium'>{form.name || '—'}</span>
                      </div>
                      <div className='flex justify-between border-b pb-2'>
                        <span className='text-muted-foreground'>Email:</span>
                        <span className='font-medium'>{form.email || '—'}</span>
                      </div>
                      <div className='space-y-1'>
                        <span className='text-muted-foreground'>
                          Selected Tours:
                        </span>
                        <div className='flex flex-wrap gap-1 mt-1'>
                          {form.tours.length > 0 ? (
                            form.tours.map((t) => (
                              <Badge
                                key={t}
                                variant='outline'
                                className='bg-background'
                              >
                                {t}
                              </Badge>
                            ))
                          ) : (
                            <span className='text-sm italic'>
                              No tours selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button className='w-full bg-primary py-6 text-lg'>
                      Confirm & Book Now
                    </Button>
                  </motion.div>
                </StepperContent>
              )}
            </StepperPanel>
          </AnimatePresence>

          {/* --- ACTIONS --- */}
          <div className='flex justify-between items-center mt-8 pt-6 border-t'>
            <Button
              variant='ghost'
              size='sm'
              onClick={prev}
              disabled={currentStep === 1}
              className='text-muted-foreground'
            >
              <ArrowLeft className='mr-2 size-4' />
              Back
            </Button>

            <Button
              size='sm'
              onClick={next}
              disabled={currentStep === steps.length}
              className='px-8'
            >
              {currentStep === steps.length ? 'Final Step' : 'Continue'}
              <ArrowRight className='ml-2 size-4' />
            </Button>
          </div>
        </Card>
      </Stepper>
    </div>
  );
}
