import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase-client';
import ResetPasswordForm from '@/components/ResetPasswordForm';

const AuthCallback = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      setIsLoading(true);
      try {
        // Check if this is a password reset flow
        if (location.pathname.includes('reset-password')) {
          setIsPasswordReset(true);
          setIsLoading(false);
          return;
        }
        
        // Get and parse the hash fragment
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');
        
        if (error) {
          console.error('Auth callback error:', error, errorDescription);
          setIsError(true);
          setIsLoading(false);
          return;
        }
        
        // Process the OAuth callback
        const { data, error: signInError } = await supabase.auth.getSession();
        
        if (signInError) {
          console.error('Auth callback error:', signInError);
          setIsError(true);
        } else {
          console.log('Auth successful, redirecting to dashboard...');
          // Redirect to dashboard on successful login
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error processing auth callback:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Processing authentication...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md mx-auto p-6 glass-card rounded-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h2>
          <p className="mb-6">There was a problem authenticating your account. Please try again.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (isPasswordReset) {
    return (
      <div className="flex items-center justify-center min-h-screen py-12">
        <ResetPasswordForm />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Successful</h2>
        <p className="mb-6">Redirecting to your dashboard...</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AuthCallback; 