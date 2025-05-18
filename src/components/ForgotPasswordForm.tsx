import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sendPasswordResetEmail } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(data.email);
      setIsSubmitted(true);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled in the hook
      console.error("Password reset request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto p-6 glass-card rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="mb-6 text-muted-foreground">
            We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-card rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
      <p className="text-center text-muted-foreground mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    {...field} 
                    disabled={isLoading} 
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm; 