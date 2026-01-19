import Footer from '@/components/layout/Footer';
// import Navbar from "@/components/layout/Navbar";
// import WhatsAppButton from "@/components/WhatsappButton";
// import React from "react";
// import { Outlet } from "react-router";
import { gsap } from "gsap"
import { useGSAP } from '@gsap/react';
const DefaultLayout = () => {
  return (
    <div className='w-full flex flex-col min-h-screen'>
      {/* <Navbar /> */}
      {/*<div className="flex-1">
    <Outlet />
    <WhatsAppButton />
  </div>*/}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
