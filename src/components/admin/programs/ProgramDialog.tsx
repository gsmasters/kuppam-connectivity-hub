import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

interface ProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  onClose: () => void;
}

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

export const ProgramDialog = ({
  open,
  onOpenChange,
  program,
  onClose,
}: ProgramDialogProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const queryClient = useQueryClient();
  const [uploadPreviews, setUploadPreviews] = useState<UploadPreview[]>([]);

  useEffect(() => {
    if (program) {
      setValue("title", program.title);
      setValue("description", program.description);
    } else {
      reset();
    }
    setUploadPreviews([]);
  }, [program, setValue, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPreviews = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const
    }));

    setUploadPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePreview = (index: number) => {
    setUploadPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      let image_urls: string[] = [];

      // Update upload status for all files
      if (uploadPreviews.length > 0) {
        const updatedPreviews = [...uploadPreviews];
        
        for (let i = 0; i < uploadPreviews.length; i++) {
          const preview = uploadPreviews[i];
          if (preview.status === 'complete') continue;

          try {
            // Update status to uploading
            updatedPreviews[i] = { ...preview, status: 'uploading' };
            setUploadPreviews(updatedPreviews);

            const fileExt = preview.file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `programs/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from("content-images")
              .upload(filePath, preview.file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from("content-images")
              .getPublicUrl(filePath);

            image_urls.push(publicUrl);

            // Update status to complete
            updatedPreviews[i] = { ...preview, status: 'complete' };
            setUploadPreviews(updatedPreviews);
          } catch (error) {
            console.error('Error uploading file:', error);
            updatedPreviews[i] = { ...preview, status: 'error' };
            setUploadPreviews(updatedPreviews);
            throw error;
          }
        }
      }

      if (program) {
        // If updating, combine new images with existing ones if they exist
        const existingImages = program.image_url.includes(',') 
          ? program.image_url.split(',').map(url => url.trim())
          : [program.image_url];
        
        const allImages = [...existingImages, ...image_urls];
        
        const { error } = await supabase
          .from("programs")
          .update({
            title: data.title,
            description: data.description,
            image_url: allImages.join(', '),
            updated_at: new Date().toISOString(),
          })
          .eq("id", program.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("programs").insert({
          title: data.title,
          description: data.description,
          image_url: image_urls.join(', '),
          is_active: true,
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs-admin"] });
      toast.success(program ? "Program updated successfully" : "Program created successfully");
      onClose();
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error(program ? "Failed to update program" : "Failed to create program");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {program ? "Edit Program" : "Add New Program"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
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
              <div className="grid grid-cols-4 gap-2 mb-2">
                {program.image_url.split(',').map((url, index) => (
                  <img 
                    key={index}
                    src={url.trim()} 
                    alt={`${program.title} - Image ${index + 1}`}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mb-2"
            />
            {uploadPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {uploadPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview.preview}
                      alt={`Upload preview ${index + 1}`}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                      {preview.status === 'uploading' && (
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      )}
                      {preview.status === 'complete' && (
                        <div className="text-green-400 text-sm font-medium">Uploaded</div>
                      )}
                      {preview.status === 'error' && (
                        <div className="text-red-400 text-sm font-medium">Error</div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removePreview(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
              disabled={mutation.isPending}
              className="gap-2"
            >
              {mutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {program ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};