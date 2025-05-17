import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, signIn, signUp, signOut, getProfile } from '@/lib/supabase-client'
import { Database } from '@/types/database.types'
import { toast } from "sonner";

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasSubscription: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile when user changes
  useEffect(() => {
    async function loadUserProfile() {
      if (!user) {
        setProfile(null);
        setHasSubscription(false);
        return;
      }

      try {
        const { data: profile, error } = await getProfile();
        
        if (error) {
          console.error('Error loading profile:', error);
          return;
        }

        setProfile(profile);
        
        // Check if user has an active subscription
        const hasActive = 
          profile.plan_status === 'active' && 
          profile.plan_end_date && 
          new Date(profile.plan_end_date) > new Date();
        
        setHasSubscription(hasActive);
      } catch (error) {
        console.error('Error in profile effect:', error);
        setProfile(null);
        setHasSubscription(false);
      }
    }

    loadUserProfile();
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      if (!username || username.trim() === '') {
        throw new Error('Username is required');
      }
      
      // Clean username - remove spaces and special characters
      const cleanUsername = username.trim().replace(/[^a-zA-Z0-9_]/g, '_');
      
      // Split name into first and last name
      const nameParts = name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      console.log('Registering user with data:', { 
        email, 
        username: cleanUsername, 
        firstName, 
        lastName 
      });
      
      const { data, error } = await signUp(email, password, {
        username: cleanUsername,
        first_name: firstName,
        last_name: lastName
      });
      
      if (error) {
        console.error('Registration error:', error);
        if (error.message.includes('unique')) {
          throw new Error('Username or email is already taken. Please try another one.');
        }
        throw error;
      }
      
      toast.success("Account created successfully.");
    } catch (error: any) {
      console.error('Registration error (detailed):', error);
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated: !!user,
    hasSubscription,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth; 