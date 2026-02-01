import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import createClient from '@/lib/supabase/supabase.client';

type UserRole = 'admin' | 'editor' | 'user' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [supabase, setSupabase] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Initialize Supabase Client (Browser Only)
  useEffect(() => {
    const client = createClient();
    setSupabase(client);
  }, []);

  // 2. Optimized Role Fetcher
  const fetchRole = async (userId: string, client: any) => {
    try {
      const { data, error } = await client
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return (data?.role as UserRole) || null;
    } catch (err) {
      console.error('Role check failed:', err);
      return null;
    }
  };

  useEffect(() => {
    if (!supabase || typeof window === 'undefined') return;

    let isCurrent = true;

    // 3. Unified handler for Session and Auth Changes
    const handleStateChange = async (session: Session | null) => {
      const currentUser = session?.user ?? null;

      if (!isCurrent) return;
      setUser(currentUser);

      if (currentUser) {
        const userRole = await fetchRole(currentUser.id, supabase);
        if (isCurrent) setRole(userRole);
      } else {
        setRole(null);
      }

      if (isCurrent) setLoading(false);
    };

    // Initial check
    supabase.auth
      .getSession()
      .then((result: { data: { session: Session | null }; error: any }) => {
        const session = result.data.session;
        if (isCurrent) handleStateChange(session);
      });

    // Listener for all subsequent changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth Event:', event);

        if (event === 'SIGNED_OUT') {
          if (isCurrent) {
            setUser(null);
            setRole(null);
            setLoading(false);
          }
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          handleStateChange(session);
        }
      },
    );

    return () => {
      isCurrent = false;
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // SSR Guard: Keep children rendered but skip logic on server
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
