import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { useState } from "react";
import { ProgramsGrid } from "./ProgramsGrid";
import { Pagination } from "./Pagination";
import { toast } from "sonner";

export const ProgramsShowcase = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      console.log("Fetching programs...");
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching programs:", error);
        toast.error("Failed to load programs");
        throw error;
      }

      console.log("Programs fetched:", data);
      return data as Program[];
    },
  });

  const totalPages = programs ? Math.ceil(programs.length / itemsPerPage) : 0;
  const startIndex = currentPage * itemsPerPage;
  const displayedPrograms = programs?.slice(startIndex, startIndex + itemsPerPage) || [];

  console.log("Total programs:", programs?.length);
  console.log("Displayed programs:", displayedPrograms.length);

  return (
    <div className="space-y-6">
      <ProgramsGrid programs={displayedPrograms} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};