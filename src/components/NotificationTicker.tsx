import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const NotificationTicker = () => {
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("active", true)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (!notifications?.length) return null;

  return (
    <div className="bg-accent/20 overflow-hidden py-1 sm:py-2">
      <div className="animate-slide whitespace-nowrap inline-block">
        {notifications.map((notification, index) => (
          <span
            key={notification.id}
            className="mx-4 text-xs sm:text-sm md:text-base inline-block"
          >
            {notification.message}
            {index < notifications.length - 1 && " • "}
          </span>
        ))}
      </div>
    </div>
  );
};