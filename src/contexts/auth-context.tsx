import { createContext, useContext, useState, useEffect } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, getProfile } from '@/lib/supabase-client'
import { Database } from '@/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  hasSubscription: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  hasSubscription: false
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasSubscription, setHasSubscription] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Fetch user profile when user changes
  useEffect(() => {
    async function loadUserProfile() {
      if (!user) {
        setProfile(null)
        setHasSubscription(false)
        return
      }

      try {
        const { data: profile, error } = await getProfile()
        
        if (error) {
          console.error('Error loading profile:', error)
          return
        }

        setProfile(profile)
        
        // Check if user has an active subscription
        const hasActive = 
          profile.plan_status === 'active' && 
          profile.plan_end_date && 
          new Date(profile.plan_end_date) > new Date()
        
        setHasSubscription(hasActive)
      } catch (error) {
        console.error('Error in profile effect:', error)
        setProfile(null)
        setHasSubscription(false)
      }
    }

    loadUserProfile()
  }, [user])

  const value = {
    user,
    profile,
    session,
    isLoading,
    hasSubscription
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
} 