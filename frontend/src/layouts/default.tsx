import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import WhatsAppButton from '@/components/WhatsappButton';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import IndexSidebar from '@/components/layout/IndexSidebar';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={() => setSidebarOpen}>
      <div className='w-full flex flex-col min-h-screen'>
        <Navbar />
        <IndexSidebar />
        <div className='flex-1'>
          <Outlet />
          <WhatsAppButton />
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default DefaultLayout;
