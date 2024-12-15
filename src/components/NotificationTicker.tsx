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
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#DD4814] py-2 text-white relative overflow-hidden w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold whitespace-nowrap">Latest Updates:</span>
          <div className="overflow-hidden flex-1 relative">
            <div className="animate-marquee whitespace-nowrap">
              <p className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>{notifications[currentIndex]?.message}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};