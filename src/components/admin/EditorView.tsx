import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, Upload, AlertCircle } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

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
              toast({
                title: "Invalid Image Size",
                description: `Image width must be ${layoutWidth}px`,
                variant: "destructive"
              });
              return;
            }
            if (layoutHeight && img.height !== layoutHeight) {
              toast({
                title: "Invalid Image Size",
                description: `Image height must be ${layoutHeight}px`,
                variant: "destructive"
              });
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
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const renderContentSizeAlert = () => {
    if (!layoutWidth && !layoutHeight) return null;

    return (
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Recommended dimensions: 
          {layoutWidth && ` Width: ${layoutWidth}px`}
          {layoutHeight && ` Height: ${layoutHeight}px`}
        </AlertDescription>
      </Alert>
    );
  };

  const renderEditor = () => {
    switch (contentType) {
      case 'image':
        return (
          <div className="space-y-4">
            {renderContentSizeAlert()}
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
          </div>
        );

      case 'text':
      case 'hero':
      case 'stats':
      case 'programs':
      case 'staff':
        return (
          <div className="space-y-4">
            {renderContentSizeAlert()}
            <RichTextEditor
              content={existingContent || ""}
              onChange={(content) => onContentChange(sectionId, content)}
            />
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