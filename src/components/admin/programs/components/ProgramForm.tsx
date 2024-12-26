import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UploadPreview {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface ProgramFormProps {
  program: any;
  uploadPreviews: UploadPreview[];
  onSubmit: (data: any) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePreview: (index: number) => void;
  isPending: boolean;
  onClose: () => void;
}

export const ProgramForm = ({
  program,
  uploadPreviews,
  onSubmit,
  onFileChange,
  onRemovePreview,
  isPending,
  onClose
}: ProgramFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: program?.title || '',
      description: program?.description || ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4 p-1">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Enter program title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="Enter program description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            {program?.image_url && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {program.image_url.split(',').map((url: string, index: number) => (
                  <div key={index} className="relative aspect-video">
                    <img
                      src={url.trim()}
                      alt={`${program.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
              className="mb-2"
            />
            {uploadPreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-video group">
                    <img
                      src={preview.preview}
                      alt={`Upload preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
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
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onRemovePreview(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="gap-2"
        >
          {isPending && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {program ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};