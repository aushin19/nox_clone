import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthRoute from "@/components/AuthRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import HeroDemo from "./pages/HeroDemo";
import PricingPage from "./pages/PricingPage";
import FaqDemo from "./pages/FaqDemo";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import ToolsLibrary from "./pages/ToolsLibrary";
import Subscription from "./pages/Subscription";
import Account from "./pages/Account";
import Support from "./pages/Support";
import Extension from "./pages/Extension";
import FixTool from "./pages/FixTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/hero-demo" element={<HeroDemo />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq-demo" element={<FaqDemo />} />
          
          {/* Auth routes */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset-password" element={<AuthCallback />} />
          <Route path="/auth/forgot-password" element={
            <AuthRoute>
              <div className="flex items-center justify-center min-h-screen py-12">
                <ForgotPasswordForm
                  onCancel={() => window.location.href = '/'}
                  onSuccess={() => window.location.href = '/'}
                />
              </div>
            </AuthRoute>
          } />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/tools" element={
            <ProtectedRoute>
              <ToolsLibrary />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/subscription" element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/support" element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/extension" element={
            <ProtectedRoute>
              <Extension />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/fix-tool" element={
            <ProtectedRoute>
              <FixTool />
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
