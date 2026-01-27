import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  tour: z.string().min(1, { message: 'Please select a tour.' }),
  date: z.date().refine((d) => !!d, { message: 'Please select a date.' }),
  participants: z
    .number()
    .min(1, { message: 'At least 1 participant is required.' }),
  phone: z.string().min(7, { message: 'Please enter a valid phone number.' }),
  specialRequests: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
