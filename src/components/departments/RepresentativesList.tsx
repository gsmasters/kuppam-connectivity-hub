import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ElectedRepresentatives } from "@/components/departments/ElectedRepresentatives";
import { Loader2 } from "lucide-react";

interface Representative {
  id: string;
  name: string;
  position: string;
  mobile: string | null;
  representative_type: 'MPP' | 'ZPTC' | 'Sarpanch' | 'MPTC';
}

export const RepresentativesList = () => {
  const { data: representatives, isLoading } = useQuery({
    queryKey: ["elected-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("elected_representatives")
        .select("*")
        .order("representative_type");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Group representatives by type
  const groupedRepresentatives = representatives?.reduce((acc: Record<string, Representative[]>, rep) => {
    if (!acc[rep.representative_type]) {
      acc[rep.representative_type] = [];
    }
    acc[rep.representative_type].push(rep);
    return acc;
  }, {
    MPP: [],
    ZPTC: [],
    Sarpanch: [],
    MPTC: []
  });

  return (
    <ElectedRepresentatives data={groupedRepresentatives || {
      MPP: [],
      ZPTC: [],
      Sarpanch: [],
      MPTC: []
    }} />
  );
};