import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase.client';

type UserRole = 'admin' | 'editor' | 'user' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Client initialized to null to prevent SSR "is not a function" errors
  const [supabase, setSupabase] = useState<ReturnType<
    typeof createClient
  > | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Initialize Supabase only once on mount (browser only)
  useEffect(() => {
    setSupabase(createClient());
  }, []);

  const checkRole = async (
    userId: string,
    client: ReturnType<typeof createClient>,
  ) => {
    try {
      const { data: isAdmin, error } = await client.rpc('has_role', {
        _role: 'admin',
        _user_id: userId,
      });

      if (error) throw error;
      setRole(isAdmin ? 'admin' : null);
    } catch (error) {
      console.error('Role check failed:', error);
      setRole(null);
    }
  };

  useEffect(() => {
    // 3. Guard: Do nothing until supabase client is ready
    if (!supabase) return;

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await checkRole(currentUser.id, supabase);
        }
      } catch (error) {
        console.error('Auth init failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await checkRole(currentUser.id, supabase);
        } else {
          setRole(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  // 4. SSR Safe Return: Return a consistent shell during server-side rendering
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
