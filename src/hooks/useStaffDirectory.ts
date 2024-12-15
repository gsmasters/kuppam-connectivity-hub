import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MandalStaff, SachivalayamStaff, ElectedRepresentative } from "@/types/staff";

export const useStaffDirectory = () => {
  // Query for mandal office staff
  const { data: mandalOfficeStaff, isLoading: isLoadingMandalOffice } = useQuery({
    queryKey: ["staff", "mandal_office"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "mandal_office")
        .order("department", { ascending: true })
        .order("position");
      if (error) throw error;
      return data as MandalStaff[];
    },
  });

  // Query for mandal level officers
  const { data: mandalOfficers, isLoading: isLoadingMandalOfficers } = useQuery({
    queryKey: ["staff", "mandal_officer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "mandal_officer")
        .order("department", { ascending: true })
        .order("position");
      if (error) throw error;
      return data as MandalStaff[];
    },
  });

  // Query for sachivalayam staff
  const { data: sachivalayamStaff, isLoading: isLoadingSachivalayam } = useQuery({
    queryKey: ["sachivalayam-staff"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sachivalayam_staff")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as SachivalayamStaff[];
    },
  });

  // Query for elected representatives
  const { data: electedRepresentatives, isLoading: isLoadingRepresentatives } = useQuery({
    queryKey: ["elected-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("elected_representatives")
        .select("*")
        .order("representative_type");
      if (error) throw error;
      return data as ElectedRepresentative[];
    },
  });

  return {
    mandalOfficeStaff,
    mandalOfficers,
    sachivalayamStaff,
    electedRepresentatives,
    isLoadingMandalOffice,
    isLoadingMandalOfficers,
    isLoadingSachivalayam,
    isLoadingRepresentatives,
  };
};