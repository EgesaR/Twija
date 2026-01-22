import { useState } from 'react';
import { useToast } from './use-toast';

export interface BookingFormData {
  tourId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  bookingDate: Date;
  numberOfGuests: number;
  specialRequests?: string;
}

export const useBooking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    
    const submitBooking = async (data: BookingFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit booking');
            }

            toast({
                title: 'Booking Successful',
                description: 'Your booking has been submitted successfully.',
                variant: 'success',
            });

            return { success: true };
        } catch (error) {
            toast({
                title: 'Booking Failed',
                description: (error as Error).message,
                variant: 'destructive',
            });
            return { success: false};
        } finally {
            setIsSubmitting(false);
        }
    }
    return {
        isSubmitting,
        submitBooking,
    };
};
