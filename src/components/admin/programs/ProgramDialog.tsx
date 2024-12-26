import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ProgramForm } from "./components/ProgramForm";

interface ProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  onClose: () => void;
}

interface UploadPreview {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface ProgramData {
  title: string;
  description: string;
  images: File[];
}

export const ProgramDialog = ({
  open,
  onOpenChange,
  program,
  onClose,
}: ProgramDialogProps) => {
  const [uploadPreviews, setUploadPreviews] = useState<UploadPreview[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!open) {
      setUploadPreviews([]);
    }
  }, [open]);

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
    mutationFn: async (data: ProgramData) => {
      let image_urls: string[] = [];

      if (uploadPreviews.length > 0) {
        const updatedPreviews = [...uploadPreviews];
        
        for (let i = 0; i < uploadPreviews.length; i++) {
          const preview = uploadPreviews[i];
          if (preview.status === 'complete') continue;

          try {
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
        <ProgramForm
          program={program}
          uploadPreviews={uploadPreviews}
          onSubmit={(data) => mutation.mutate(data)}
          onFileChange={handleFileChange}
          onRemovePreview={removePreview}
          isPending={mutation.isPending}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};