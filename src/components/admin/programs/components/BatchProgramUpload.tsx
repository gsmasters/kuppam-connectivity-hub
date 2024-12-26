import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface ProgramDraft {
  title: string;
  description: string;
  images: File[];
}

export const BatchProgramUpload = () => {
  const [programs, setPrograms] = useState<ProgramDraft[]>([]);
  const queryClient = useQueryClient();

  const addProgram = () => {
    setPrograms(prev => [...prev, { title: "", description: "", images: [] }]);
  };

  const removeProgram = (index: number) => {
    setPrograms(prev => prev.filter((_, i) => i !== index));
  };

  const handleTitleChange = (index: number, value: string) => {
    setPrograms(prev => prev.map((program, i) => 
      i === index ? { ...program, title: value } : program
    ));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setPrograms(prev => prev.map((program, i) => 
      i === index ? { ...program, description: value } : program
    ));
  };

  const handleImagesChange = (index: number, files: FileList | null) => {
    if (!files) return;
    setPrograms(prev => prev.map((program, i) => 
      i === index ? { ...program, images: [...Array.from(files)] } : program
    ));
  };

  const mutation = useMutation({
    mutationFn: async (programs: ProgramDraft[]) => {
      const results = [];

      for (const program of programs) {
        const image_urls: string[] = [];

        // Upload images
        for (const file of program.images) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `programs/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("content-images")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("content-images")
            .getPublicUrl(filePath);

          image_urls.push(publicUrl);
        }

        // Create program
        const { error } = await supabase.from("programs").insert({
          title: program.title,
          description: program.description,
          image_url: image_urls.join(', '),
          is_active: true,
        });

        if (error) throw error;
        results.push({ title: program.title });
      }

      return results;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["programs-admin"] });
      toast.success(`Successfully created ${data.length} programs`);
      setPrograms([]);
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error("Failed to create programs");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Batch Upload Programs</h3>
        <Button onClick={addProgram} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Program
        </Button>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border">
        <div className="p-4 space-y-6">
          {programs.map((program, index) => (
            <div key={index} className="relative p-4 border rounded-lg">
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={() => removeProgram(index)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={program.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    placeholder="Enter program title"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={program.description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    placeholder="Enter program description"
                  />
                </div>

                <div>
                  <Label>Images</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImagesChange(index, e.target.files)}
                  />
                </div>
              </div>
            </div>
          ))}

          {programs.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              Click "Add Program" to start creating multiple programs at once
            </div>
          )}
        </div>
      </ScrollArea>

      {programs.length > 0 && (
        <Button 
          onClick={() => mutation.mutate(programs)}
          disabled={mutation.isPending}
          className="w-full gap-2"
        >
          {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Upload {programs.length} Programs
        </Button>
      )}
    </div>
  );
};