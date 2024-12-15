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
  const [showContacts, setShowContacts] = useState(false);

  const contacts = [
    { text: "94910 71391" },
    { text: "kuppam.brgf@gmail.com" },
    { text: "MPDO Office, Kuppam Mandal" }
  ];

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
      setShowContacts(data?.length === 0);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (notifications.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % contacts.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications.length]);

  if (loading) {
    return null;
  }

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

  const currentNotification = notifications[currentIndex];
  const currentContact = contacts[currentIndex % contacts.length];

  return (
    <div 
      className={`bg-gradient-to-r ${showContacts ? 'from-amber-400 via-amber-500 to-[#DD4814]' : getPriorityGradient(currentNotification?.priority || 'medium')} py-2 text-white w-full`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold whitespace-nowrap">
            {showContacts ? "Contact Us:" : "Latest Updates:"}
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-[slide_20s_linear_infinite]">
              <p className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>
                  {showContacts ? currentContact.text : currentNotification?.message}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};