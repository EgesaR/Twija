// src/context/AuthContext.tsx  (or wherever you place it)

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase.client';

type UserRole = 'admin' | 'editor' | 'user' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to fetch role
  const checkRole = async (userId: string) => {
    const { data: isAdmin, error } = await supabase.rpc('has_role', {
      _role: 'admin',
      user_id: userId,
    });
    if (!error && isAdmin) {
      setRole('admin');
    } else {
      setRole(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await checkRole(currentUser.id);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Optional: Listen for auth state changes (recommended!)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: any, session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // Re-check role on auth change
          await checkRole(currentUser.id);
        } else {
          setRole(null);
        }
      },
    );

    // Cleanup listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    role,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook with type safety + runtime check
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
