import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { useState } from "react";
import { ProgramsGrid } from "./ProgramsGrid";
import { Pagination } from "./Pagination";

export const ProgramsShowcase = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching programs:", error);
        throw error;
      }
      return data as Program[];
    },
  });

  const totalPages = programs ? Math.ceil(programs.length / itemsPerPage) : 0;
  const startIndex = currentPage * itemsPerPage;
  const displayedPrograms = programs?.slice(startIndex, startIndex + itemsPerPage) || [];

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