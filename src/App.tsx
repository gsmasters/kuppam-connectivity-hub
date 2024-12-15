import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContactBar } from "@/components/ContactBar";
import Index from "./pages/Index";
import About from "./pages/About";
import StaffDirectory from "./pages/StaffDirectory";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

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
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/staff-directory" element={<StaffDirectory />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <ContactBar />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;