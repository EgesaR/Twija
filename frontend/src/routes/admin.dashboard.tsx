import type { Route } from './+types/admin.dashboard';
import React from 'react';
import TourManagement from '@/components/admin/TourManagement';
import { createSupabaseServerClient } from '@/lib/supabase.server';
import { redirect, useRevalidator } from 'react-router';
import { Package, MapPin, ShieldCheck } from 'lucide-react';
import type { Tour } from '@/types/tour'; // Import your new interface

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { supabase } = createSupabaseServerClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("DEBUG: No session found, sending to login")
    throw redirect('/auth/login?error-no_session');
  }

  const { data: isAdmin, error: roleError } = await supabase
    .rpc('has_role', {
      _role: 'admin',
      _user_id: session.user.id,
    })
  
  if (roleError || !isAdmin) {
    console.log("DEBUG: User is logged in but NOT an admin. Found: ", isAdmin)
    throw redirect('/auth/login?error=not_admin')

  }

  // Note: Ensure your Supabase table columns match the interface nested structure
  // or use a view/transform if the DB is flat.
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Loader Error:', error.message);

  return {
    tours: (tours as unknown as Tour[]) || [],
  };
};

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const { tours } = loaderData;
  const revalidator = useRevalidator();

  // Updated Stats based on new interface
  const totalTours = tours.length;
  const verifiedTours = tours.filter((t) => t.assurance.isVerified).length;

  return (
    <div className='container mx-auto p-6 min-h-screen'>
      <header className='mb-8 border-b pb-6 flex justify-between items-start'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-primary'>
            Kigali Tour Console
          </h1>
          <p className='text-muted-foreground mt-2'>
            Managing standardized Kigali tour experiences.
          </p>
        </div>
        
      </header>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='glass-card p-4 flex items-center gap-4 border rounded-xl shadow-sm'>
          <div className='p-3 bg-primary/10 rounded-full text-primary'>
            <Package size={20} />
          </div>
          <div>
            <p className='text-2xl font-bold'>{totalTours}</p>
            <p className='text-xs text-muted-foreground uppercase'>
              Total Tours
            </p>
          </div>
        </div>

        <div className='glass-card p-4 flex items-center gap-4 border rounded-xl shadow-sm'>
          <div className='p-3 bg-blue-500/10 rounded-full text-blue-600'>
            <MapPin size={20} />
          </div>
          <div>
            <p className='text-2xl font-bold'>Kigali</p>
            <p className='text-xs text-muted-foreground uppercase'>
              Primary City
            </p>
          </div>
        </div>

        <div className='glass-card p-4 flex items-center gap-4 border rounded-xl shadow-sm'>
          <div className='p-3 bg-green-500/10 rounded-full text-green-600'>
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className='text-2xl font-bold'>{verifiedTours}</p>
            <p className='text-xs text-muted-foreground uppercase'>
              Verified Listings
            </p>
          </div>
        </div>
      </div>

      <main>
        <TourManagement
          tours={tours}
          onRefresh={() => revalidator.revalidate()}
        />
      </main>
    </div>
  );
}
