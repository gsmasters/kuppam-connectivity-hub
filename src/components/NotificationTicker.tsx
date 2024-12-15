import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const NotificationTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("active", true)
        .gte("end_date", new Date().toISOString())
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    if (notifications.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current === notifications.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications.length]);

  if (notifications.length === 0) return null;

  return (
    <div className="bg-primary py-3 text-white shadow-md w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <span className="font-semibold whitespace-nowrap flex-shrink-0">Latest Updates:</span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap">
              <p className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 flex-shrink-0" />
                <span>{notifications[currentIndex]?.message}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};