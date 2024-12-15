import { useState } from "react";
import { Loader2, FolderOpen, ArrowLeft } from "lucide-react";
import { ContentSection } from "./ContentSection";
import { PreviewDialog } from "./PreviewDialog";
import { useContentManagement } from "@/hooks/useContentManagement";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EditorView } from "./EditorView";

export const ContentManager = () => {
  const [selectedSection, setSelectedSection] = useState<{
    id: string;
    label: string;
    parentLabel: string;
  } | null>(null);
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

  const handleContentChange = (section: string, newContent: string) => {
    console.log('Content changed for section:', section);
    setPreviewContent(newContent);
    markContentChanged(section);
  };

  const renderSectionsList = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                {page.label}
              </CardTitle>
              <CardDescription>
                {page.sections.length} section{page.sections.length !== 1 ? 's' : ''}
              </CardDescription>
              <div className="mt-4 space-y-2">
                {page.sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedSection({
                      id: section.id,
                      label: section.label,
                      parentLabel: page.label
                    })}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  };

  if (selectedSection) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedSection(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{selectedSection.label}</h2>
              <p className="text-sm text-muted-foreground">{selectedSection.parentLabel}</p>
            </div>
          </div>
          <PreviewDialog content={previewContent} />
        </div>
        <EditorView
          sectionId={selectedSection.id}
          existingContent={content[selectedSection.id] || ""}
          onContentChange={handleContentChange}
          onSave={() => saveContent(selectedSection.id, previewContent)}
          saving={saving}
          hasUnsavedChanges={unsavedChanges[selectedSection.id]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>
      {renderSectionsList()}
    </div>
  );
};