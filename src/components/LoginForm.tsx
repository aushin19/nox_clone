
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle login logic here
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
                  <Input placeholder="name@example.com" {...field} />
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <div className="text-center mt-4 text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{" "}
            <a href="#signup" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
