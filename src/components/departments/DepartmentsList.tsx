import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { Loader2 } from "lucide-react";

interface Staff {
  id: string;
  name: string;
  position: string;
  mobile: string | null;
  department: string | null;
  email?: string;
}

export const DepartmentsList = () => {
  const { data: staffData, isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .order("department");
      
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

  // Group staff by department
  const departments = staffData?.reduce((acc: Record<string, Staff[]>, staff) => {
    const dept = staff.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(staff);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(departments || {}).map(([department, staff]) => (
        <DepartmentCard
          key={department}
          title={department}
          staff={staff}
        />
      ))}
    </div>
  );
};