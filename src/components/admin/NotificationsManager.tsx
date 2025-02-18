import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NotificationsList } from "./notifications/NotificationsList";
import { NotificationDialog } from "./notifications/NotificationDialog";

export const NotificationsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | undefined>();

  const handleEdit = (notificationId: string) => {
    setSelectedNotificationId(notificationId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedNotificationId(undefined);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Notification
          </Button>
        </CardHeader>
        <CardContent>
          <NotificationsList onEdit={handleEdit} />
        </CardContent>
      </Card>

      <NotificationDialog 
        open={isDialogOpen} 
        onOpenChange={handleDialogClose}
        notificationId={selectedNotificationId}
      />
    </div>
  );
};