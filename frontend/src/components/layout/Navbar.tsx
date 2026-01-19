import { navLinks } from '@/constants';
import React from 'react';
import { Link } from 'react-router';
import { getImageUrl } from '@/utils/images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  useGSAP(() => {
    
  });
  return (
    <nav>
      <div>
        <Link
          to='/'
          className='flex items-center gap-2 focus:outline-0 focus:ring-0 focus:border-0 border-0 '
        >
          <img
            src={getImageUrl('logo_bg.png')}
            alt='logo'
            className='rounded-xl w-20'
          />
          <p>Kigali City Tours</p>
        </Link>
        <ul>
          {navLinks.map((link: { id: string; title: string; url?: string }) => (
            <li key={link.id}>
              <Link to={link.url ? link.url : `#${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
