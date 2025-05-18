import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session, User, Provider } from '@supabase/supabase-js'
import { 
  supabase, 
  signIn, 
  signUp, 
  signOut, 
  signInWithProvider,
  resetPassword,
  updatePassword,
  getProfile 
} from '@/lib/supabase-client'
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
  emailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: Provider) => Promise<void>;
  register: (name: string, email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Check if email is verified
      if (session?.user) {
        setEmailVerified(session.user.email_confirmed_at !== null);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Check email verification status when auth state changes
        if (session?.user) {
          setEmailVerified(session.user.email_confirmed_at !== null);
        } else {
          setEmailVerified(false);
        }
        
        // Handle specific auth events
        if (event === 'PASSWORD_RECOVERY') {
          // Redirect to password reset page if not already there
          if (!window.location.pathname.includes('/reset-password')) {
            window.location.href = '/auth/reset-password';
          }
        }
        
        if (event === 'SIGNED_IN') {
          toast.success("Signed in successfully");
        }
        
        if (event === 'SIGNED_OUT') {
          toast.success("Signed out successfully");
        }
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
          // Don't fail completely - still set up a minimal profile
          setProfile(null);
          setHasSubscription(false);
          toast.error("Could not load user profile. Some features may be limited.");
          return;
        }

        if (!profile) {
          console.warn('No profile found for user');
          // Create a minimal profile to avoid UI issues
          setProfile({
            id: user.id,
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'user_temp',
            email: user.email || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as any);
          setHasSubscription(false);
          return;
        }

        console.log('Profile loaded successfully:', profile);
        setProfile(profile);
        
        // Check if user has an active subscription
        const hasActive = 
          profile.plan_status === 'active' && 
          profile.plan_end_date && 
          new Date(profile.plan_end_date) > new Date();
        
        setHasSubscription(hasActive);
      } catch (error) {
        console.error('Error in profile effect:', error);
        // Don't crash - set up minimal profile
        setProfile({
          id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || 'user_temp',
          email: user.email || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any);
        setHasSubscription(false);
        toast.error("Failed to load complete profile. Some features may be limited.");
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
      let errorMessage = error.message || "Login failed";
      
      // Provide more user-friendly error messages
      if (errorMessage.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (errorMessage.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before logging in.";
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginWithProvider = async (provider: Provider) => {
    try {
      const { data, error } = await signInWithProvider(provider);
      
      if (error) {
        throw error;
      }
      
      // Note: Toast will be shown by the auth state change handler
    } catch (error: any) {
      toast.error(error.message || "Social login failed");
      throw error;
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
      
      // Check if email confirmation is required
      if (data?.user && !data.user.email_confirmed_at) {
        toast.success("Please check your email to verify your account.");
      } else {
        toast.success("Account created successfully.");
      }
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
      // Toast will be shown by the auth state change handler
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendPasswordResetEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        throw error;
      }
      
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const changePassword = async (newPassword: string) => {
    setIsLoading(true);
    try {
      const { error } = await updatePassword(newPassword);
      
      if (error) {
        throw error;
      }
      
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
      throw error;
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
    emailVerified,
    login,
    loginWithProvider,
    register,
    logout,
    sendPasswordResetEmail,
    changePassword
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