import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/**
 * NotificationTicker Component
 * Displays latest updates in a scrollable ticker format
 * Features:
 * - Horizontal scrolling with custom scrollbar
 * - Real-time updates via React Query
 * - Auto-rotation of notifications
 */
export const NotificationTicker = () => {
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

  // Auto-rotate notifications every 5 seconds
  useEffect(() => {
    if (notifications.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === notifications.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  if (notifications.length === 0) return null;

  return (
    <div className="w-full bg-primary/95 border-t border-b border-primary/20">
      <div className="container mx-auto">
        <ScrollArea className="w-full">
          <div className="flex items-center gap-4 py-2 px-4 min-w-full">
            <span className="font-semibold text-white whitespace-nowrap flex-shrink-0">
              Latest Updates:
            </span>
            <div className="flex items-center gap-8">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="inline-flex items-center gap-2 text-white whitespace-nowrap"
                >
                  <ArrowRight className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{notification.message}</span>
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};