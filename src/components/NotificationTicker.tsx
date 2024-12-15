import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchNotifications = async () => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('active', true)
    .gte('end_date', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const NotificationTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (notifications.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications.length]);

  if (notifications.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#DD4814] py-2 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold whitespace-nowrap">Latest Updates:</span>
          <div className="overflow-hidden flex-1">
            <div className="animate-[slide_20s_linear_infinite]">
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