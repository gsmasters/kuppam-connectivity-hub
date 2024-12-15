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
  Plus,
  Eye
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNewPageDialog, setShowNewPageDialog] = useState(false);

  const pageTemplates = [
    {
      name: "Blank Page",
      sections: [],
      description: "Start with a clean slate"
    },
    {
      name: "Standard Page",
      sections: ["hero", "content", "contact"],
      description: "A typical page with header, content and contact sections"
    },
    {
      name: "Landing Page",
      sections: ["hero", "features", "testimonials", "cta"],
      description: "Perfect for promotional pages"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">MPDO Dashboard</h1>
        <div className="flex gap-2">
          <Dialog open={showNewPageDialog} onOpenChange={setShowNewPageDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="pageName">Page Name</Label>
                  <Input id="pageName" placeholder="Enter page name" />
                </div>
                <div className="space-y-2">
                  <Label>Choose a Template</Label>
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {pageTemplates.map((template) => (
                        <Card 
                          key={template.name}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => {
                            // Handle template selection
                            setShowNewPageDialog(false);
                          }}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            {template.sections.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium">Includes:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside">
                                  {template.sections.map((section) => (
                                    <li key={section} className="capitalize">{section}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => navigate("/admin/settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
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