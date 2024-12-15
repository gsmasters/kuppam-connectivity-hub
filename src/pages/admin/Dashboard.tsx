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
  BarChart, 
  PhoneCall,
  Settings,
  Bell,
  Calendar,
  Image,
  Layout
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { 
      title: "Events", 
      path: "/admin/events",
      icon: Calendar,
      description: "Manage upcoming events and announcements"
    },
    { 
      title: "Population Stats", 
      path: "/admin/stats",
      icon: BarChart,
      description: "View and update population statistics"
    },
    { 
      title: "Department Contacts", 
      path: "/admin/contacts",
      icon: PhoneCall,
      description: "Manage department contact information"
    },
    { 
      title: "Media Library", 
      path: "/admin/media",
      icon: Image,
      description: "Manage uploaded images and files"
    },
    { 
      title: "Notifications", 
      path: "/admin/notifications",
      icon: Bell,
      description: "Manage site-wide notifications"
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">MPDO Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/admin/settings")}>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="gap-2">
            <FileText className="h-4 w-4" />
            Content Management
          </TabsTrigger>
          <TabsTrigger value="pages" className="gap-2">
            <Layout className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="staff" className="gap-2">
            <Users className="h-4 w-4" />
            Staff Management
          </TabsTrigger>
          <TabsTrigger value="quick-access" className="gap-2">
            <Settings className="h-4 w-4" />
            Quick Access
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="pages">
          <PageManager />
        </TabsContent>

        <TabsContent value="staff">
          <StaffManager />
        </TabsContent>

        <TabsContent value="quick-access">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{section.description}</p>
                    <Button onClick={() => navigate(section.path)}>
                      Manage {section.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;