import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * NotificationTicker Component
 * Displays a scrolling ticker of notifications at the top of the page
 * Features:
 * - Continuous horizontal scrolling
 * - Auto-rotation of multiple notifications
 * - Real-time updates via React Query
 */
export const NotificationTicker = () => {
  // State to track current notification index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch active notifications from Supabase
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Auto-rotate notifications every 5 seconds if there are multiple
  useEffect(() => {
    if (notifications.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === notifications.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  // Don't render anything if there are no notifications
  if (notifications.length === 0) return null;

  return (
    <div className="w-full bg-primary/90 border-t border-b border-primary/20 overflow-hidden">
      <div className="container mx-auto">
        <div className="relative py-2 px-4">
          <div className="flex items-center gap-4">
            {/* Fixed label */}
            <span className="font-semibold text-white whitespace-nowrap flex-shrink-0">
              Latest Updates:
            </span>
            
            {/* Scrolling notifications container */}
            <div className="overflow-hidden flex-1">
              <div 
                className="animate-marquee inline-flex items-center gap-8 whitespace-nowrap"
                style={{ animation: 'marquee 20s linear infinite' }}
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="inline-flex items-center gap-2 text-white"
                  >
                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{notification.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};