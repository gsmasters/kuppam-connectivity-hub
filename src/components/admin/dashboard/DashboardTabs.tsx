import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, FileText, Users } from "lucide-react";
import { PageManager } from "@/components/admin/PageManager";
import { ContentManager } from "@/components/admin/ContentManager";
import { StaffManager } from "@/components/admin/StaffManager";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="pages" className="space-y-4">
      <TabsList className="inline-flex h-14 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full sm:w-auto">
        <TabsTrigger 
          value="pages" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
        >
          <Grid className="h-4 w-4" />
          Pages
        </TabsTrigger>
        <TabsTrigger 
          value="content"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
        >
          <FileText className="h-4 w-4" />
          Content
        </TabsTrigger>
        <TabsTrigger 
          value="staff"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
        >
          <Users className="h-4 w-4" />
          Staff
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="mt-4">
        <PageManager />
      </TabsContent>

      <TabsContent value="content" className="mt-4">
        <ContentManager />
      </TabsContent>

      <TabsContent value="staff" className="mt-4">
        <StaffManager />
      </TabsContent>
    </Tabs>
  );
};