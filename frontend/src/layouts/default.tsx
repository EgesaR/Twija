import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsappButton';
import IndexSidebar from '@/components/layout/IndexSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

// IMPORTANT: import the client-only wrapper, not sonner
import SonnerToaster from '@/components/ui/sonner-toaster.client';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensures client-only rendering without hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className='w-full flex flex-col min-h-screen'>
        <Navbar />
        <IndexSidebar />

        <main className='flex-1'>
          <Outlet />
          <WhatsAppButton />
        </main>

        <Footer />

        {/* Client-only UI */}
        {mounted && <SonnerToaster />}
      </div>
    </SidebarProvider>
  );
};

export default DefaultLayout;
