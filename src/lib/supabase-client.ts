import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

// Initialize the Supabase client - these values are loaded from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Auth-related functions
export async function signUp(email: string, password: string, userData: { username: string; first_name?: string; last_name?: string }) {
  // Log the data being sent to ensure all required fields are present
  console.log('Signing up with user data:', { email, userData });
  
  // Make sure username is provided and not empty
  if (!userData.username || userData.username.trim() === '') {
    throw new Error('Username is required');
  }
  
  // Explicitly format the data to match what the trigger expects
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
      },
    },
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  return supabase.auth.signOut()
}

// Profile-related functions
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
}

export async function updateProfile({ firstName, lastName, email }: { 
  firstName: string
  lastName: string
  email?: string
}) {
  return supabase.rpc('update_user_profile', {
    new_first_name: firstName,
    new_last_name: lastName,
    new_email: email,
  })
}

// Subscription plan-related functions
export async function updateUserPlan({ 
  planSku, 
  planName, 
  planPrice, 
  durationMonths 
}: { 
  planSku: string
  planName: string
  planPrice: number
  durationMonths: number 
}) {
  return supabase.rpc('update_user_plan', {
    selected_plan_sku: planSku,
    selected_plan_name: planName,
    selected_plan_price: planPrice,
    plan_duration_months: durationMonths,
  })
}

// Helper to check if user has an active subscription
export async function hasActiveSubscription() {
  const { data: profile, error } = await getProfile()
  
  if (error) {
    console.error('Error checking subscription:', error)
    return false
  }
  
  if (!profile) {
    return false
  }
  
  // Check if plan is active and not expired
  return (
    profile.plan_status === 'active' && 
    profile.plan_end_date && 
    new Date(profile.plan_end_date) > new Date()
  )
} 