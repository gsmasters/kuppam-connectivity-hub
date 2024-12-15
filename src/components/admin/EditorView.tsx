import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";
import { PreviewDialog } from "./PreviewDialog";
import { ImageUploader } from "./editor/ImageUploader";
import { EditorActions } from "./editor/EditorActions";

interface EditorViewProps {
  sectionId: string;
  contentType: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff' | 'features' | 'testimonials' | 'gallery' | 'pricing' | 'faq';
  layoutWidth: number | null;
  layoutHeight: number | null;
  existingContent: any;
  onContentChange: (sectionId: string, content: any) => void;
  onSave: () => void;
  onPublish: () => void;
  saving: boolean;
  isDraft: boolean;
  hasUnsavedChanges: boolean;
}

export const EditorView = ({
  sectionId,
  contentType,
  layoutWidth,
  layoutHeight,
  existingContent,
  onContentChange,
  onSave,
  onPublish,
  saving,
  isDraft,
  hasUnsavedChanges,
}: EditorViewProps) => {
  const renderEditor = () => {
    switch (contentType) {
      case 'image':
        return (
          <ImageUploader
            sectionId={sectionId}
            layoutWidth={layoutWidth}
            layoutHeight={layoutHeight}
            existingContent={existingContent}
            onContentChange={onContentChange}
          />
        );

      case 'text':
      case 'hero':
      case 'stats':
      case 'programs':
      case 'staff':
      case 'features':
      case 'testimonials':
      case 'gallery':
      case 'pricing':
      case 'faq':
        return (
          <RichTextEditor
            content={existingContent || ""}
            onChange={(content) => onContentChange(sectionId, content)}
          />
        );

      default:
        return (
          <RichTextEditor
            content={existingContent || ""}
            onChange={(content) => onContentChange(sectionId, content)}
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Content</CardTitle>
        <CardDescription>
          Make changes to your content and save as draft or publish when ready
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderEditor()}
        <EditorActions
          onSave={onSave}
          onPublish={onPublish}
          saving={saving}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </CardContent>
    </Card>
  );
};