'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu, // Added SidebarMenu for correct structure
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '../ui/sidebar';
import { navLinks } from '@/data/navigation';
import { Link, useLocation, useNavigate } from 'react-router';

const IndexSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();

  const links = [{ id: 'home', url: '/', title: 'Home' }, ...navLinks];

  const handleNavigation = (e: React.MouseEvent, url: string) => {
    e.preventDefault();

    setOpenMobile(false);

    setTimeout(() => {
      navigate(url);
    }, 250);
  };
  return (
    <Sidebar className='fixed top-0 left-0 z-100 border-r border-neutral-200 bg-white'>
      <SidebarHeader className='p-4 border-b border-neutral-100'>
        <h2 className='font-bold text-neutral-950'>Kigali City Tours</h2>
      </SidebarHeader>

      <SidebarContent className='bg-white'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-neutral-500'>
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {/* SidebarMenu is required by Shadcn for proper spacing/list styling */}
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.url}
                    className={`
                      transition-colors duration-200
                      ${
                        pathname === link.url
                          ? 'bg-neutral-100 text-indigo-600 font-semibold'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                      }
                    `}
                  >
                    <Link
                      to={link.url}
                      onClick={(e) => handleNavigation(e, link.url)}
                    >
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4 border-t border-neutral-100 text-xs text-neutral-400'>
        © 2024 Kigali City Tours
      </SidebarFooter>
    </Sidebar>
  );
};

export default IndexSidebar;
