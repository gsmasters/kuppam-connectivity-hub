import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const NotificationTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (notifications.length <= 1) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications.length]);

  if (!notifications.length) return null;

  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#DD4814] py-2 text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold whitespace-nowrap">Latest Updates:</span>
          <div className="overflow-hidden flex-1">
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                isTransitioning 
                  ? "opacity-0 -translate-y-4" 
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                animation: notifications.length > 1 
                  ? "scroll 20s linear infinite" 
                  : "none"
              }}
            >
              <p className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span className="line-clamp-1 animate-marquee">
                  {notifications[currentIndex]?.message}
                </span>
              </p>
            </div>
          </div>
          {notifications.length > 1 && (
            <span className="text-sm opacity-75">
              {currentIndex + 1}/{notifications.length}
            </span>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};