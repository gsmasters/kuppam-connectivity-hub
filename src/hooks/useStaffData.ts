import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type StaffType = "mandal_office" | "panchayat_secretary" | "elected_representative" | 
                 "sachivalayam" | "mandal_officer" | "revenue" | "education" | 
                 "health" | "agriculture";

interface StaffMember {
  id: string;
  name: string;
  position: string;
  mobile?: string;
  department?: string;
  staff_type: StaffType;
  is_working: boolean;
  created_at: string;
  updated_at: string;
}

export const useStaffData = (staffType: StaffType) => {
  const query = useQuery({
    queryKey: ["staff", staffType],
    queryFn: async () => {
      console.log("Fetching staff data for type:", staffType);
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", staffType)
        .eq("is_working", true);

      if (error) {
        console.error("Error fetching staff data:", error);
        throw error;
      }

      console.log("Staff data fetched:", data);
      return data as StaffMember[];
    },
  });

  return {
    staff: query.data,
    isLoading: query.isLoading,
  };
};