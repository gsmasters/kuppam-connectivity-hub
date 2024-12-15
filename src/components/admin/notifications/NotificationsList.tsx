import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { NotificationDialog } from "./NotificationDialog";

interface Notification {
  id: string;
  message: string;
  active: boolean;
  start_date: string;
  end_date: string | null;
  priority: 'low' | 'medium' | 'high';
  position: 'top' | 'bottom';
  created_at: string;
  updated_at: string;
}

export const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadNotifications();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        (payload) => {
          console.log('Change received!', payload);
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const typedNotifications = (data || []).map(notification => ({
        ...notification,
        position: notification.position as 'top' | 'bottom',
        priority: notification.priority as 'low' | 'medium' | 'high'
      }));
      
      setNotifications(typedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Notification deleted successfully");
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error("Failed to delete notification");
    }
  };

  const handleEdit = (id: string) => {
    setSelectedNotification(id);
    setIsDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium">{notification.message}</TableCell>
              <TableCell>
                <Badge className={`${getPriorityColor(notification.priority)} text-white`}>
                  {notification.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {notification.position === 'top' ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      Top Scroll
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <ArrowDown className="h-3 w-3" />
                      Bottom Scroll
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={notification.active ? "default" : "secondary"}>
                  {notification.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(notification.start_date), 'PPP')}</TableCell>
              <TableCell>
                {notification.end_date 
                  ? format(new Date(notification.end_date), 'PPP')
                  : "No end date"
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(notification.id)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NotificationDialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedNotification(null);
        }}
        notificationId={selectedNotification || undefined}
      />
    </>
  );
};