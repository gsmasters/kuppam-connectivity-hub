import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Upload } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { supabase } from "@/integrations/supabase/client";

interface EditorViewProps {
  sectionId: string;
  contentType: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff';
  layoutWidth: number | null;
  layoutHeight: number | null;
  existingContent: any;
  onContentChange: (sectionId: string, content: any) => void;
  onSave: () => void;
  saving: boolean;
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
  saving,
  hasUnsavedChanges,
}: EditorViewProps) => {
  const [newContent, setNewContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Check if image dimensions match layout requirements
      if (layoutWidth || layoutHeight) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve) => {
          img.onload = () => {
            if (layoutWidth && img.width !== layoutWidth) {
              alert(`Image width must be ${layoutWidth}px`);
              return;
            }
            if (layoutHeight && img.height !== layoutHeight) {
              alert(`Image height must be ${layoutHeight}px`);
              return;
            }
            resolve(true);
          };
        });
      }

      const { data, error } = await supabase.storage
        .from('content-images')
        .upload(`${sectionId}/${file.name}`, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('content-images')
        .getPublicUrl(data.path);

      onContentChange(sectionId, { url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const renderEditor = () => {
    switch (contentType) {
      case 'image':
        return (
          <div className="space-y-4">
            {existingContent?.url && (
              <img 
                src={existingContent.url} 
                alt="Current content"
                className="max-w-full h-auto rounded-lg"
              />
            )}
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            {(layoutWidth || layoutHeight) && (
              <p className="text-sm text-muted-foreground">
                Required dimensions: {layoutWidth && `${layoutWidth}px width`} {layoutHeight && `${layoutHeight}px height`}
              </p>
            )}
          </div>
        );

      case 'text':
      case 'hero':
        return (
          <Tabs defaultValue="existing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing">Edit Existing Content</TabsTrigger>
              <TabsTrigger value="new">Add New Content</TabsTrigger>
            </TabsList>

            <TabsContent value="existing">
              <RichTextEditor
                content={existingContent}
                onChange={(content) => onContentChange(sectionId, content)}
              />
            </TabsContent>

            <TabsContent value="new">
              <RichTextEditor
                content={newContent}
                onChange={setNewContent}
              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    const combinedContent = `${existingContent}\n${newContent}`;
                    onContentChange(sectionId, combinedContent);
                    setNewContent("");
                  }}
                  disabled={!newContent.trim()}
                >
                  Add to Existing Content
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        );

      // Add more cases for other content types as needed
      default:
        return (
          <RichTextEditor
            content={existingContent}
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
          Make changes to your content and publish when ready
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderEditor()}
        <div className="flex justify-end">
          <Button
            onClick={onSave}
            disabled={saving || !hasUnsavedChanges}
            className="gap-2"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4" />
            Publish Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};