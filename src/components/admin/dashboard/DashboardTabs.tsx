import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Layout, Users } from "lucide-react";
import { PageManager } from "@/components/admin/PageManager";
import { ContentManager } from "@/components/admin/ContentManager";
import { StaffManager } from "@/components/admin/StaffManager";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="pages" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pages" className="gap-2">
          <Layout className="h-4 w-4" />
          Pages
        </TabsTrigger>
        <TabsTrigger value="content" className="gap-2">
          <FileText className="h-4 w-4" />
          Content
        </TabsTrigger>
        <TabsTrigger value="staff" className="gap-2">
          <Users className="h-4 w-4" />
          Staff
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="mt-0">
        <PageManager />
      </TabsContent>

      <TabsContent value="content" className="mt-0">
        <ContentManager />
      </TabsContent>

      <TabsContent value="staff" className="mt-0">
        <StaffManager />
      </TabsContent>
    </Tabs>
  );
};