import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
            onClick={() => handleEdit(notification)}
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

export const NotificationsList = () => {
  const queryClient = useQueryClient();
  const [selectedNotification, setSelectedNotification] = useState(null);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (notification) => {
    setSelectedNotification(notification);
  };

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