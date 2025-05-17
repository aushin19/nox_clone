import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
}

interface ApiError {
  error: string;
  status?: number;
}

/**
 * Fetch API client with error handling and authentication
 */
async function fetchApi<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    
    // Default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };
    
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body,
      credentials: options.credentials || 'same-origin',
      signal: options.signal,
    });
    
    // Parse the JSON response
    const data = await response.json();
    
    // Handle API errors
    if (!response.ok) {
      const error: ApiError = {
        error: data.error || 'Something went wrong',
        status: response.status,
      };
      throw error;
    }
    
    return data as T;
  } catch (error) {
    // Handle network errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw { error: 'Request was cancelled' };
    }
    
    // Handle API errors
    if ((error as ApiError).error) {
      toast.error((error as ApiError).error);
      throw error;
    }
    
    // Handle other errors
    toast.error('Network error. Please check your connection.');
    throw { error: 'Network error' };
  }
}

/**
 * HTTP request methods
 */
export const api = {
  get: <T>(endpoint: string, options: Omit<ApiOptions, 'method' | 'body'> = {}) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, data: unknown, options: Omit<ApiOptions, 'method'> = {}) => 
    fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  put: <T>(endpoint: string, data: unknown, options: Omit<ApiOptions, 'method'> = {}) => 
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  patch: <T>(endpoint: string, data: unknown, options: Omit<ApiOptions, 'method'> = {}) => 
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    
  delete: <T>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * API service for specific endpoints
 */
export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) => 
      api.post<{ token: string; user: any }>('/auth/login', credentials),
      
    register: (userData: { email: string; password: string; name: string }) => 
      api.post<{ token: string; user: any }>('/auth/register', userData),
      
    me: () => api.get<any>('/auth/me'),
      
    logout: () => {
      localStorage.removeItem('auth_token');
      return Promise.resolve();
    },
  },
  
  // Tasks endpoints
  tasks: {
    getAll: () => api.get<any[]>('/tasks'),
    getById: (id: string) => api.get<any>(`/tasks/${id}`),
    create: (task: any) => api.post<any>('/tasks', task),
    update: (id: string, task: any) => api.put<any>(`/tasks/${id}`, task),
    delete: (id: string) => api.delete<void>(`/tasks/${id}`),
  },
  
  // Files endpoints
  files: {
    getAll: () => api.get<any[]>('/files'),
    getById: (id: string) => api.get<any>(`/files/${id}`),
    upload: (file: File, metadata?: any) => {
      const formData = new FormData();
      formData.append('file', file);
      
      if (metadata) {
        formData.append('metadata', JSON.stringify(metadata));
      }
      
      return api.post<any>('/files/upload', formData, {
        headers: {} // Content-Type will be set automatically for FormData
      });
    },
    delete: (id: string) => api.delete<void>(`/files/${id}`),
  },
};

export default apiService; 