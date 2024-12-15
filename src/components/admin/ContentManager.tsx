import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { ContentSection } from "./ContentSection";
import { PreviewDialog } from "./PreviewDialog";
import { useContentManagement } from "@/hooks/useContentManagement";

export const ContentManager = () => {
  const [previewContent, setPreviewContent] = useState<string>("");
  const { 
    content, 
    loading, 
    saving, 
    unsavedChanges, 
    saveContent, 
    markContentChanged 
  } = useContentManagement();

  const sections = [
    {
      id: "home",
      label: "Home Page",
      sections: [
        { id: "hero", label: "Hero Section" },
        { id: "programs", label: "Programs" },
        { id: "stats", label: "Statistics" },
      ]
    },
    {
      id: "about",
      label: "About Page",
      sections: [
        { id: "main", label: "Main Content" },
        { id: "mission", label: "Mission & Vision" },
      ]
    },
    {
      id: "staff",
      label: "Staff Page",
      sections: [
        { id: "departments", label: "Departments" },
        { id: "representatives", label: "Representatives" },
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleContentChange = (section: string, newContent: string) => {
    setPreviewContent(newContent);
    markContentChanged(section);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <PreviewDialog content={previewContent} />
      </div>

      <Tabs defaultValue="home">
        <TabsList className="grid w-full grid-cols-3">
          {sections.map((page) => (
            <TabsTrigger key={page.id} value={page.id}>
              {page.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((page) => (
          <TabsContent key={page.id} value={page.id} className="space-y-4">
            {page.sections.map((section) => (
              <ContentSection
                key={section.id}
                title={section.label}
                description={`Edit ${section.label.toLowerCase()} content`}
                content={content[section.id] || ""}
                saving={saving}
                hasUnsavedChanges={unsavedChanges[section.id]}
                onContentChange={(newContent) => 
                  handleContentChange(section.id, newContent)
                }
                onSave={() => saveContent(section.id, previewContent)}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};