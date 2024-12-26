import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { ProgramDialog } from "./ProgramDialog";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export const ProgramsManager = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Program[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from("programs")
        .delete()
        .in("id", ids);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs-admin"] });
      toast.success(selectedPrograms.length > 1 
        ? "Programs deleted successfully" 
        : "Program deleted successfully"
      );
      setSelectedPrograms([]);
    },
    onError: () => {
      toast.error("Failed to delete programs");
    },
  });

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setIsDialogOpen(true);
  };

  const handleDelete = async (ids: string[]) => {
    if (window.confirm(ids.length > 1 
      ? "Are you sure you want to delete these programs?" 
      : "Are you sure you want to delete this program?"
    )) {
      deleteMutation.mutate(ids);
    }
  };

  const toggleProgramSelection = (id: string) => {
    setSelectedPrograms(prev => 
      prev.includes(id) 
        ? prev.filter(programId => programId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedPrograms.length === programs?.length) {
      setSelectedPrograms([]);
    } else {
      setSelectedPrograms(programs?.map(p => p.id) || []);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getFirstImageUrl = (imageUrl: string) => {
    return imageUrl?.split(',')[0]?.trim() || '/placeholder.svg';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Programs Management</h2>
        <div className="flex gap-2">
          {selectedPrograms.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={() => handleDelete(selectedPrograms)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedPrograms.length})
            </Button>
          )}
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Program
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {programs?.length > 0 && (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedPrograms.length === programs.length}
              onCheckedChange={handleSelectAll}
              aria-label="Select all programs"
            />
            <span className="text-sm text-muted-foreground">
              {selectedPrograms.length === programs.length 
                ? "Deselect all" 
                : "Select all"}
            </span>
          </div>
        )}

        <div className="grid gap-4">
          {programs?.map((program) => (
            <div
              key={program.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedPrograms.includes(program.id)}
                  onCheckedChange={() => toggleProgramSelection(program.id)}
                  aria-label={`Select ${program.title}`}
                />
                <div className="h-16 w-16 relative rounded overflow-hidden">
                  <img
                    src={getFirstImageUrl(program.image_url)}
                    alt={program.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{program.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {program.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(program)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete([program.id])}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProgramDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        program={selectedProgram}
        onClose={() => {
          setSelectedProgram(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};