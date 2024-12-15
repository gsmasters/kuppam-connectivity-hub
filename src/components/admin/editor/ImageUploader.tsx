import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  sectionId: string;
  layoutWidth: number | null;
  layoutHeight: number | null;
  existingContent: { url?: string };
  onContentChange: (sectionId: string, content: any) => void;
}

export const ImageUploader = ({
  sectionId,
  layoutWidth,
  layoutHeight,
  existingContent,
  onContentChange,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

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

  return (
    <div className="space-y-4">
      {(layoutWidth || layoutHeight) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Recommended dimensions: 
            {layoutWidth && ` Width: ${layoutWidth}px`}
            {layoutHeight && ` Height: ${layoutHeight}px`}
          </AlertDescription>
        </Alert>
      )}
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
};