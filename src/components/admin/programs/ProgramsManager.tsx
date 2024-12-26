import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { ProgramDialog } from "./ProgramDialog";
import { BatchProgramUpload } from "./components/BatchProgramUpload";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgramActions } from "./components/ProgramActions";
import { ProgramList } from "./components/ProgramList";

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Program List</TabsTrigger>
          <TabsTrigger value="batch">Batch Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Programs Management</h2>
            <ProgramActions
              selectedCount={selectedPrograms.length}
              onDelete={() => handleDelete(selectedPrograms)}
              onAdd={() => setIsDialogOpen(true)}
            />
          </div>

          <ProgramList
            programs={programs || []}
            selectedPrograms={selectedPrograms}
            onToggleSelect={toggleProgramSelection}
            onSelectAll={handleSelectAll}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="batch">
          <BatchProgramUpload />
        </TabsContent>
      </Tabs>

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