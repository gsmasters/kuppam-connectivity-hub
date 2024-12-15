import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ContentManager } from "@/components/admin/ContentManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Events", path: "/admin/events" },
    { title: "Staff Directory", path: "/admin/staff" },
    { title: "Population Stats", path: "/admin/stats" },
    { title: "Department Contacts", path: "/admin/contacts" },
  ];

  return (
    <div className="space-y-6 p-6">
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="quick-access">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Card key={section.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate(section.path)}>
                    Manage {section.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;