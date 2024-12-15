import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactBar } from "@/components/ContactBar";
import { NotificationTicker } from "@/components/NotificationTicker";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import Index from "./pages/Index";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { AdminLayout } from "./components/admin/AdminLayout";

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <NotificationTicker />
            <LeadershipBanner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
            <ContactBar />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;