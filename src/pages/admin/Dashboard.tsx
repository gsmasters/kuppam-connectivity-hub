import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ContentManager } from "@/components/admin/ContentManager";
import { PageManager } from "@/components/admin/PageManager";
import { StaffManager } from "@/components/admin/StaffManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Users,
  Layout,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">MPDO Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/admin/settings")}>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="gap-2">
            <Layout className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <FileText className="h-4 w-4" />
            Content Blocks
          </TabsTrigger>
          <TabsTrigger value="staff" className="gap-2">
            <Users className="h-4 w-4" />
            Staff
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <PageManager />
        </TabsContent>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="staff">
          <StaffManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;