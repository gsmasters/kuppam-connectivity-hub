import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type StaffType = "mandal_office" | "panchayat_secretary" | "elected_representative" | 
                 "sachivalayam" | "mandal_officer" | "revenue" | "education" | 
                 "health" | "agriculture";

export const useStaffData = (staffType: StaffType) => {
  return useQuery({
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
      return data;
    },
  });
};