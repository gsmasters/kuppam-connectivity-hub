import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface NotificationsListProps {
  onEdit: (notificationId: string) => void;
}

export const NotificationsList = ({ onEdit }: NotificationsListProps) => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      console.log('Fetching notifications...');
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Fetched notifications:', data);
      return data;
    },
    refetchInterval: 2000, // Refetch every 2 seconds
  });

  const columns = [
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.active ? "default" : "secondary"}>
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => format(new Date(row.original.created_at), 'PPP'),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const notification = row.original;
        
        const handleDelete = async () => {
          try {
            const { error } = await supabase
              .from('notifications')
              .delete()
              .eq('id', notification.id);
            
            if (error) throw error;
            
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success("Notification deleted successfully");
          } catch (error) {
            console.error('Error deleting notification:', error);
            toast.error("Failed to delete notification");
          }
        };

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(notification.id)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={notifications || []}
    />
  );
};