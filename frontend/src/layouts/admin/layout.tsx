import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';

const AdminLayout = () => {
  const { user, role, loading } = useAuth();

  if (loading)
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        Loading...
      </div>
    );
  
  if(!user || role !== 'admin')
    return <Navigate to={"/auth/login"} replace />
  
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
