import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EditorActions } from "./editor/EditorActions";
import { TextEditor } from "./editor/content/TextEditor";
import { ImageEditor } from "./editor/content/ImageEditor";
import { PreviewSection } from "./editor/preview/PreviewSection";

interface EditorViewProps {
  sectionId: string;
  contentType: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff';
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
          <ImageEditor
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
        return (
          <TextEditor
            sectionId={sectionId}
            existingContent={existingContent || ""}
            onContentChange={onContentChange}
          />
        );

      default:
        return (
          <TextEditor
            sectionId={sectionId}
            existingContent={existingContent || ""}
            onContentChange={onContentChange}
          />
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
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
      </div>

      <PreviewSection
        content={existingContent}
        isDraft={isDraft}
        contentType={contentType}
        layoutWidth={layoutWidth}
        layoutHeight={layoutHeight}
      />
    </div>
  );
};