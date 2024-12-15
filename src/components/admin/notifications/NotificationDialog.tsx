import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notificationId?: string;
}

export const NotificationDialog = ({ open, onOpenChange, notificationId }: NotificationDialogProps) => {
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notificationId && open) {
      loadNotification();
    } else if (!open) {
      resetForm();
    }
  }, [notificationId, open]);

  const loadNotification = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('id', notificationId)
        .single();

      if (error) throw error;

      if (data) {
        setMessage(data.message);
        setActive(data.active ?? true);
      }
    } catch (error) {
      console.error('Error loading notification:', error);
      toast.error("Failed to load notification");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const notificationData = {
        message,
        active,
        updated_at: new Date().toISOString(),
      };

      if (notificationId) {
        const { error } = await supabase
          .from('notifications')
          .update(notificationData)
          .eq('id', notificationId);

        if (error) throw error;
        toast.success("Notification updated successfully");
      } else {
        const { error } = await supabase
          .from('notifications')
          .insert({
            ...notificationData,
            start_date: new Date().toISOString(),
          });

        if (error) throw error;
        toast.success("Notification created successfully");
      }

      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error saving notification:', error);
      toast.error(notificationId ? "Failed to update notification" : "Failed to create notification");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setMessage("");
    setActive(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{notificationId ? "Edit" : "Create New"} Notification</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            Loading notification data...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch
                id="active"
                checked={active}
                onCheckedChange={setActive}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (notificationId ? "Updating..." : "Creating...") : (notificationId ? "Update" : "Create")} Notification
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};