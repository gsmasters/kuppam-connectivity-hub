import { useEffect, useState } from "react";
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
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

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
    <div className="w-full bg-primary border-t border-b border-primary/20">
      <div className="container mx-auto">
        <div className="relative overflow-hidden py-2 px-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white whitespace-nowrap">
              Latest Updates:
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-marquee inline-flex items-center gap-8 whitespace-nowrap">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className="inline-flex items-center gap-2 text-white"
                  >
                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    <span>{notification.message}</span>
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