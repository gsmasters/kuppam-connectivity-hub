import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EditorView } from "./EditorView";
import { PreviewDialog } from "./PreviewDialog";

interface Section {
  id: string;
  title: string;
  description: string | null;
  content_type: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff';
  layout_width: number | null;
  layout_height: number | null;
}

interface SectionEditorProps {
  section: Section;
  content: any;
  onBack: () => void;
  onContentChange: (sectionId: string, content: any) => void;
  onSave: (sectionId: string) => void;
  onPublish: (sectionId: string) => void;
  saving: boolean;
  isDraft: boolean;
  hasUnsavedChanges: boolean;
}

export const SectionEditor = ({
  section,
  content,
  onBack,
  onContentChange,
  onSave,
  onPublish,
  saving,
  isDraft,
  hasUnsavedChanges
}: SectionEditorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isDraft && (
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              Draft
            </span>
          )}
          <PreviewDialog content={content || ""} />
        </div>
      </div>

      <EditorView
        sectionId={section.id}
        contentType={section.content_type}
        layoutWidth={section.layout_width}
        layoutHeight={section.layout_height}
        existingContent={content || ""}
        onContentChange={onContentChange}
        onSave={() => onSave(section.id)}
        onPublish={() => onPublish(section.id)}
        saving={saving}
        isDraft={isDraft}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};