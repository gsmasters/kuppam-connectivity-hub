import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ImagePreviewGrid } from "./ImagePreviewGrid";
import { ExistingImagesGrid } from "./ExistingImagesGrid";

interface FormData {
  title: string;
  description: string;
  images: FileList;
}

interface UploadPreview {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface ProgramFormProps {
  program: any;
  uploadPreviews: UploadPreview[];
  onSubmit: (data: FormData) => void;
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
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: program?.title || '',
      description: program?.description || ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <ExistingImagesGrid 
            images={program.image_url.split(',')} 
            title={program.title} 
          />
        )}
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="mb-2"
        />
        <ImagePreviewGrid 
          previews={uploadPreviews}
          onRemove={onRemovePreview}
        />
      </div>

      <div className="flex justify-end gap-2">
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