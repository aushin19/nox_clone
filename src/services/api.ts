/**
 * @file API service for interacting with the backend.
 */

import { signIn, signUp, getProfile, updateProfile, updateUserPlan } from '@/lib/supabase-client'

// The base URL for API calls is '/api' because Vite is configured
// to proxy requests from '/api' to the backend server (e.g., http://localhost:3000/api).
const API_BASE_URL = '/api';

/**
 * Represents the structure of a Task object.
 * Adjust this based on the actual structure of your task data.
 */
export interface Task {
  id: string; // Or number, depending on your backend
  title: string;
  description?: string;
  completed?: boolean;
  // Add other relevant task properties
}

/**
 * Fetches tasks for the authenticated user.
 * Assumes JWT or session cookie is automatically sent by the browser.
 *
 * @returns A promise that resolves to an array of tasks.
 * @throws Will throw an error if the network response is not ok.
 */
export async function fetchUserTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // If you are using token-based authentication (e.g., JWT in localStorage)
        // you might need to add an Authorization header here.
        // Example: 'Authorization': `Bearer ${yourAuthToken}`
      },
      // If your backend relies on cookies for auth (e.g., httpOnly session cookies),
      // and your frontend is on a different subdomain in production, you might need:
      // credentials: 'include',
    });

    if (!response.ok) {
      // Attempt to get error message from backend response body
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch tasks and could not parse error response.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const tasks: Task[] = await response.json();
    return tasks;
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    // Propagate the error so UI components can handle it
    throw error;
  }
}

// You can add more functions here to interact with other backend endpoints,
// for example, for authentication, files, etc.

/**
 * User login using Supabase.
 *
 * @param credentials - User's login credentials.
 * @returns A promise that resolves with the login response.
 */
export async function loginUser(credentials: { email: string; password: string }): Promise<any> {
  try {
    // Use the Supabase client directly instead of a proxy endpoint
    const { data, error } = await signIn(credentials.email, credentials.password);
    
    if (error) {
      throw new Error(error.message || 'Login failed');
    }
    
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

/**
 * Registers a new user using Supabase.
 *
 * @param registrationData - User's registration data (email, password, and optional name).
 * @returns A promise that resolves with the registration response.
 * @throws Will throw an error if registration fails.
 */
export async function registerUser(registrationData: { 
  email: string; 
  password: string; 
  username: string;
  name?: string;
}): Promise<any> {
  try {
    // Extract first name and last name from name if provided
    let firstName = '';
    let lastName = '';
    
    if (registrationData.name) {
      const nameParts = registrationData.name.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    // Use the Supabase client directly
    const { data, error } = await signUp(
      registrationData.email, 
      registrationData.password,
      {
        username: registrationData.username,
        first_name: firstName,
        last_name: lastName
      }
    );
    
    if (error) {
      throw new Error(error.message || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}

// Add other API functions as needed, for example:
// - registerUser
// - fetchUserProfile
// - createTask
// - updateTask
// - deleteTask
// - uploadFile
// - etc. 