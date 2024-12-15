import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, FileText, Upload } from "lucide-react";
import { NotificationsManager } from "@/components/admin/NotificationsManager";
import { AboutUsEditor } from "@/components/admin/pages/AboutUsEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const DashboardTabs = () => {
  const [publishingNotifications, setPublishingNotifications] = useState(false);
  const [publishingAbout, setPublishingAbout] = useState(false);

  const publishNotifications = async () => {
    setPublishingNotifications(true);
    try {
      const { data: notifications, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_draft', true);

      if (fetchError) throw fetchError;

      if (notifications && notifications.length > 0) {
        const { error: updateError } = await supabase
          .from('notifications')
          .update({ is_published: true, is_draft: false })
          .in('id', notifications.map(n => n.id));

        if (updateError) throw updateError;

        toast.success("All notifications published successfully");
      } else {
        toast.info("No draft notifications to publish");
      }
    } catch (error) {
      console.error('Error publishing notifications:', error);
      toast.error("Failed to publish notifications");
    } finally {
      setPublishingNotifications(false);
    }
  };

  const publishAboutContent = async () => {
    setPublishingAbout(true);
    try {
      const { data: sections } = await supabase
        .from('page_sections')
        .select('id')
        .eq('page', 'about-us')
        .eq('section', 'main')
        .single();

      if (sections) {
        const { error: updateError } = await supabase
          .from('section_content')
          .update({ 
            is_published: true,
            is_draft: false 
          })
          .eq('section_id', sections.id)
          .eq('is_draft', true);

        if (updateError) throw updateError;

        toast.success("About us content published successfully");
      }
    } catch (error) {
      console.error('Error publishing about content:', error);
      toast.error("Failed to publish about us content");
    } finally {
      setPublishingAbout(false);
    }
  };

  return (
    <Tabs defaultValue="notifications" className="space-y-4">
      <TabsList className="inline-flex h-14 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full sm:w-auto">
        <TabsTrigger 
          value="notifications"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
        >
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger 
          value="about"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
        >
          <FileText className="h-4 w-4" />
          About Us
        </TabsTrigger>
      </TabsList>

      <TabsContent value="notifications" className="mt-4">
        <div className="flex justify-end mb-4">
          <Button
            onClick={publishNotifications}
            disabled={publishingNotifications}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {publishingNotifications ? "Publishing..." : "Publish All Notifications"}
          </Button>
        </div>
        <NotificationsManager />
      </TabsContent>

      <TabsContent value="about" className="mt-4">
        <div className="flex justify-end mb-4">
          <Button
            onClick={publishAboutContent}
            disabled={publishingAbout}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {publishingAbout ? "Publishing..." : "Publish About Content"}
          </Button>
        </div>
        <AboutUsEditor />
      </TabsContent>
    </Tabs>
  );
};