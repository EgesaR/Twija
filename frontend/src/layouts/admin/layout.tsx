import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import { isAdmin } from '@/lib/policies/auth-policies';

const AdminLayout = () => {
  const { user, role, loading } = useAuth();
  const authorized = isAdmin(user, role);
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      y: -20, // Slides the whole container up slightly on exit
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  } as const;

  // 1. Guard for unauthorized users (Runs only after loading is done)
  if (!loading && !authorized) {
    return <Navigate to='/auth/login?error=not_admin' replace />;
  }

  // 2. Main Render - Using AnimatePresence to toggle between Loader and Content
  return (
    <div className='relative min-h-screen w-full'>
      <AnimatePresence mode='wait'>
        {loading ? (
          <motion.div
            key='loader-container'
            variants={containerVariants}
            initial='hidden'
            animate='show'
            exit='exit'
            className='fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-white gap-6'
          >
            <motion.div variants={itemVariants}>
              <Spinner color={'text-black'} size={36} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label className='text-2xl'>Loading Admin Panel...</Label>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key='admin-content'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className='min-h-screen bg-slate-50'
          >
            <nav className='border-b bg-white p-4 shadow-sm'>
              <div className='container mx-auto flex justify-between'>
                <span className='font-bold text-emerald-800'>
                  Kigali Console
                </span>
                <span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700'>
                  Admin Mode
                </span>
              </div>
            </nav>
            <main>
              <Outlet />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
