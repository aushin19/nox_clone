
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tools" element={<ToolsLibrary />} />
          <Route path="/dashboard/subscription" element={<Subscription />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/dashboard/extension" element={<Extension />} />
          <Route path="/dashboard/fix-tool" element={<FixTool />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
