import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UploadPreview {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface ImagePreviewGridProps {
  previews: UploadPreview[];
  onRemove: (index: number) => void;
}

export const ImagePreviewGrid = ({ previews, onRemove }: ImagePreviewGridProps) => {
  if (!previews.length) return null;

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={preview.preview}
                alt={`Upload preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                {preview.status === 'uploading' && (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                )}
                {preview.status === 'complete' && (
                  <span className="text-green-400 text-sm font-medium">Uploaded</span>
                )}
                {preview.status === 'error' && (
                  <span className="text-red-400 text-sm font-medium">Error</span>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};