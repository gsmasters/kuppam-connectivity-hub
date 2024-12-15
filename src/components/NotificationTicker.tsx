import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  message: string;
  active: boolean;
  priority: 'low' | 'medium' | 'high';
  position: string;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string | null;
}

export const NotificationTicker = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();

    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        () => {
          loadNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading notifications:', error);
        return;
      }

      setNotifications(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [notifications.length]);

  if (loading) {
    return null;
  }

  if (notifications.length === 0) {
    return null;
  }

  const currentNotification = notifications[currentIndex];
  const isTopPosition = currentNotification?.position !== 'bottom';

  const getPriorityGradient = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'from-red-500 via-red-600 to-red-700';
      case 'medium':
        return 'from-amber-400 via-amber-500 to-[#DD4814]';
      case 'low':
        return 'from-green-500 via-green-600 to-green-700';
      default:
        return 'from-amber-400 via-amber-500 to-[#DD4814]';
    }
  };

  return (
    <div 
      className={`bg-gradient-to-r ${getPriorityGradient(currentNotification?.priority || 'medium')} py-2 text-white fixed w-full z-50 ${
        isTopPosition ? 'top-0' : 'bottom-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold whitespace-nowrap">Latest Updates:</span>
          <div className="overflow-hidden flex-1">
            <div className="animate-[slide_20s_linear_infinite]">
              <p className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>{currentNotification?.message}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};