import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { resendVerificationEmail } from '@/lib/supabase-client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EmailVerificationBannerProps {
  className?: string;
}

const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({ className }) => {
  const { user, emailVerified } = useAuth();
  const [isResending, setIsResending] = useState(false);
  
  // If user is verified or no user, don't show the banner
  if (emailVerified || !user) {
    return null;
  }
  
  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { success, message } = await resendVerificationEmail();
      
      if (success) {
        toast.success('Verification email sent. Please check your inbox');
      } else {
        toast.error(message || 'Failed to send verification email');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <Alert variant="warning" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Email Verification Required</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Please verify your email address to access all features.</span>
        <Button 
          size="sm" 
          variant="outline" 
          className="ml-4 flex items-center gap-1.5" 
          onClick={handleResendEmail}
          disabled={isResending}
        >
          <Mail className="h-3.5 w-3.5" />
          {isResending ? 'Sending...' : 'Resend Email'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default EmailVerificationBanner; 