import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Loads an external script and returns a promise that resolves when the script is loaded
 * 
 * @param src URL of the script to load
 * @param id ID for the script tag
 * @returns Promise that resolves to true when script is loaded, false if script fails to load
 */
export const loadScript = (src: string, id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    const existingScript = document.getElementById(id);
    if (existingScript) {
      resolve(true);
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = true;
    
    // Attach listeners
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      console.error(`Failed to load script: ${src}`);
      document.body.removeChild(script);
      resolve(false);
    };
    
    // Append to body
    document.body.appendChild(script);
  });
};

/**
 * Format price to display in a human-readable format
 */
export const formatPrice = (amount: number, currency = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a date string to display in a human-readable format
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString));
};
