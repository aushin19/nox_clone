import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  onLoginClose: () => void;
  onSignupClose: () => void;
}

const AuthModals = ({
  isLoginOpen,
  isSignupOpen,
  onLoginClose,
  onSignupClose
}: AuthModalsProps) => {
  return (
    <>
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
          <LoginForm onLoginSuccess={onLoginClose} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isSignupOpen} onOpenChange={onSignupClose}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
          <SignupForm onSignupSuccess={onSignupClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;
