import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import { PreviewDialog } from "./PreviewDialog";
import { EditorView } from "./EditorView";

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
  saving: boolean;
  hasUnsavedChanges: boolean;
}

export const SectionEditor = ({
  section,
  content,
  onBack,
  onContentChange,
  onSave,
  saving,
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
        <div className="flex gap-2">
          {content && (
            <PreviewDialog content={content} />
          )}
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
        saving={saving}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};