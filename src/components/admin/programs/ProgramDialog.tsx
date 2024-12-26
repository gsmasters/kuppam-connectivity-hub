import { useEffect } from "react";
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
import { Loader2 } from "lucide-react";

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

export const ProgramDialog = ({
  open,
  onOpenChange,
  program,
  onClose,
}: ProgramDialogProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (program) {
      setValue("title", program.title);
      setValue("description", program.description);
    } else {
      reset();
    }
  }, [program, setValue, reset]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      let image_urls: string[] = [];

      if (data.images?.length > 0) {
        const uploadPromises = Array.from(data.images).map(async (file) => {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `program-images/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("content-images")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("content-images")
            .getPublicUrl(filePath);

          return publicUrl;
        });

        image_urls = await Promise.all(uploadPromises);
      }

      if (program) {
        const { error } = await supabase
          .from("programs")
          .update({
            title: data.title,
            description: data.description,
            image_url: image_urls[0] || program.image_url, // Keep existing image if no new ones uploaded
            updated_at: new Date().toISOString(),
          })
          .eq("id", program.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("programs").insert({
          title: data.title,
          description: data.description,
          image_url: image_urls[0], // Use first image as main image
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
    onError: () => {
      toast.error(program ? "Failed to update program" : "Failed to create program");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {program ? "Edit Program" : "Add New Program"}
          </DialogTitle>
        </DialogHeader>
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
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
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