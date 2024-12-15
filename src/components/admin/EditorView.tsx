import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";
import { PreviewDialog } from "./PreviewDialog";
import { ImageUploader } from "./editor/ImageUploader";
import { EditorActions } from "./editor/EditorActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye } from "lucide-react";

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
        return (
          <div className="space-y-4">
            <RichTextEditor
              content={existingContent || ""}
              onChange={(content) => onContentChange(sectionId, content)}
            />
            <div className="flex flex-wrap gap-2 p-2 border-t">
              <div className="text-sm text-muted-foreground">
                Quick Formatting:
              </div>
              <button
                onClick={() => onContentChange(sectionId, existingContent + "<h2>New Heading</h2>")}
                className="px-2 py-1 text-sm bg-secondary rounded hover:bg-secondary/80"
              >
                Add Heading
              </button>
              <button
                onClick={() => onContentChange(sectionId, existingContent + "<ul><li>New List Item</li></ul>")}
                className="px-2 py-1 text-sm bg-secondary rounded hover:bg-secondary/80"
              >
                Add List
              </button>
              <button
                onClick={() => onContentChange(sectionId, existingContent + "<hr />")}
                className="px-2 py-1 text-sm bg-secondary rounded hover:bg-secondary/80"
              >
                Add Divider
              </button>
            </div>
          </div>
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

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              See how your content will look on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="desktop" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="desktop">
                <ScrollArea className="h-[calc(100vh-400px)] w-full rounded-md border">
                  <div className="p-4">
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: existingContent || "" }}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="mobile">
                <ScrollArea className="h-[calc(100vh-400px)] mx-auto" style={{ maxWidth: "375px" }}>
                  <div className="p-4 border rounded-md">
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: existingContent || "" }}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {isDraft && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This content is currently in draft mode. Click "Publish" to make it live.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Content Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Status: </span>
              <span className={`${isDraft ? 'text-yellow-600' : 'text-green-600'}`}>
                {isDraft ? 'Draft' : 'Published'}
              </span>
            </div>
            <div>
              <span className="font-medium">Content Type: </span>
              <span className="capitalize">{contentType}</span>
            </div>
            {(layoutWidth || layoutHeight) && (
              <div>
                <span className="font-medium">Recommended Dimensions: </span>
                <span>
                  {layoutWidth && `Width: ${layoutWidth}px`}
                  {layoutWidth && layoutHeight && ' × '}
                  {layoutHeight && `Height: ${layoutHeight}px`}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};