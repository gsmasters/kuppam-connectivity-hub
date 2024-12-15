import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, FileText, Users, Bell } from "lucide-react";
import { PageManager } from "@/components/admin/PageManager";
import { ContentManager } from "@/components/admin/ContentManager";
import { StaffManager } from "@/components/admin/StaffManager";
import { NotificationsManager } from "@/components/admin/NotificationsManager";

export const DashboardTabs = () => {
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
      </TabsList>

      <TabsContent value="notifications" className="mt-4">
        <NotificationsManager />
      </TabsContent>
    </Tabs>
  );
};