import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const AdminLayout = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth/login');
      } else if (role !== 'admin') {
        navigate('/');
      }
    }
  }, [user, role, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className='w-full h-screen'>
      <nav>Admin Header</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
