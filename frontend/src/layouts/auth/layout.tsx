import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsappButton';
import IndexSidebar from '@/components/layout/IndexSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

// IMPORTANT: import the client-only wrapper, not sonner
import SonnerToaster from '@/components/ui/sonner-toaster.client';

const AuthLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensures client-only rendering without hydration mismatch
  useEffect(() => {
      setMounted(true);
      console.log("Sidebar mounted: ",mounted)
  }, []);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className='w-full flex flex-col h-screen overflow-hidden'>
        <main className='flex-1 flex items-center justify-center'>
          <Outlet />
          <WhatsAppButton />    
        </main>
      </div>
      {/* Client-only UI */}
      {mounted && <SonnerToaster />}
    </SidebarProvider>
  );
};

export default AuthLayout;
