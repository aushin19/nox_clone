import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
  onSignupClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLoginSuccess, 
  onForgotPassword,
  onSignupClick
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { login, loginWithProvider } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Login failed:", err);
      // toast({
      //   title: "Login Error",
      //   description: err.message || "An unexpected error occurred. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsSocialLoading(provider);
    try {
      await loginWithProvider(provider);
      // Redirect happens automatically via the OAuth flow
    } catch (err: any) {
      console.error(`${provider} login failed:`, err);
      // toast({
      //   title: "Social Login Error",
      //   description: err.message || "An unexpected error occurred. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsSocialLoading(null);
    }
  };
  
  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      navigate('/auth/forgot-password');
    }
  };

  const handleSignupClick = () => {
    if (onSignupClick) {
      onSignupClick();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-card rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !!isSocialLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          
          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center gap-2" 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading || !!isSocialLoading}
            >
              {isSocialLoading === 'google' ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Google
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center gap-2" 
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading || !!isSocialLoading}
            >
              {isSocialLoading === 'github' ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <svg viewBox="0 0 438.549 438.549" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
                    c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
                    c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
                    c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
                    c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
                    c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
                    c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
                    c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
                    c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
                    c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
                    c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
                    c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
                    c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
                    c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
                    c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
                    c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
                    c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
                    c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
                    c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
                    C438.536,184.851,428.728,148.168,409.132,114.573z"
                  />
                </svg>
              )}
              GitHub
            </Button>
          </div> */}
          
          <div className="text-center mt-4 text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{" "}
            <Button 
              type="button" 
              variant="link" 
              className="p-0 h-auto text-primary" 
              onClick={handleSignupClick}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
