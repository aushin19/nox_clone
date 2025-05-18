import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  onLoginClose: () => void;
  onSignupClose: () => void;
  onSwitchToSignup?: () => void;
  onSwitchToLogin?: () => void;
}

const AuthModals = ({
  isLoginOpen,
  isSignupOpen,
  onLoginClose,
  onSignupClose,
  onSwitchToSignup,
  onSwitchToLogin
}: AuthModalsProps) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };
  
  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };
  
  const handleLoginSuccess = () => {
    setShowForgotPassword(false);
    onLoginClose();
  };

  const handleSwitchToSignup = () => {
    onLoginClose();
    if (onSwitchToSignup) {
      setTimeout(() => {
        onSwitchToSignup();
      }, 100);
    }
  };

  const handleSwitchToLogin = () => {
    onSignupClose();
    if (onSwitchToLogin) {
      setTimeout(() => {
        onSwitchToLogin();
      }, 100);
    }
  };

  return (
    <>
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
          {showForgotPassword ? (
            <ForgotPasswordForm 
              onCancel={handleBackToLogin}
              onSuccess={handleBackToLogin} 
            />
          ) : (
            <LoginForm 
              onLoginSuccess={handleLoginSuccess} 
              onForgotPassword={handleForgotPasswordClick}
              onSignupClick={handleSwitchToSignup}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isSignupOpen} onOpenChange={onSignupClose}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
          <SignupForm 
            onSignupSuccess={onSignupClose}
            onLoginClick={handleSwitchToLogin} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;
