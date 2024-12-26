import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const NotificationTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: notifications = [] } = useQuery({
    queryKey: ['active-notifications'],
    queryFn: async () => {
      console.log('Fetching active notifications for ticker...');
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('active', true)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Fetched active notifications:', data);
      return data || [];
    },
    refetchInterval: 2000, // Refetch every 2 seconds
  });

  useEffect(() => {
    if (notifications.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications.length]);

  if (!notifications.length) return null;

  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#DD4814] py-2 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold whitespace-nowrap min-w-fit">Latest Updates:</span>
          <div className="overflow-hidden flex-1 relative">
            <div className="flex items-center space-x-2">
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
              <div className="animate-[slide_15s_linear_infinite] whitespace-nowrap">
                <span>{notifications[currentIndex]?.message}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};