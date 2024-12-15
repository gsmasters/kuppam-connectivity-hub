import { Loader2, AlertCircle } from "lucide-react";
import { useContentManagement } from "@/hooks/useContentManagement";
import { PageSectionList } from "./PageSectionList";
import { SectionEditor } from "./SectionEditor";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ContentManager = () => {
  const {
    selectedSection,
    setSelectedSection,
    loading,
    saving,
    sections,
    content,
    unsavedChanges,
    handleContentChange,
    handleSave
  } = useContentManagement();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No content sections found. Please configure content sections in the database.
        </AlertDescription>
      </Alert>
    );
  }

  if (selectedSection) {
    return (
      <SectionEditor
        section={selectedSection}
        content={content[selectedSection.id]}
        onBack={() => setSelectedSection(null)}
        onContentChange={handleContentChange}
        onSave={handleSave}
        saving={saving}
        hasUnsavedChanges={unsavedChanges[selectedSection.id]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((page) => (
          <PageSectionList
            key={page.id}
            pageId={page.id}
            label={page.label}
            sections={page.sections}
            onSelectSection={setSelectedSection}
          />
        ))}
      </div>
    </div>
  );
};