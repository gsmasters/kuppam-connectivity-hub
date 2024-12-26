import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import About from "./pages/About";
import Programs from "./pages/Programs";
import StaffDirectory from "./pages/StaffDirectory";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import Index from "./pages/Index";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<MainLayout><Index /></MainLayout>} />
            <Route path="/about-us" element={<MainLayout><About /></MainLayout>} />
            <Route path="/programs" element={<MainLayout><Programs /></MainLayout>} />
            <Route path="/staff-directory" element={<MainLayout><StaffDirectory /></MainLayout>} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;