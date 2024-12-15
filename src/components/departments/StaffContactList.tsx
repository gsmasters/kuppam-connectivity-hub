import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { useState } from "react";
import { StaffTabs } from "./staff/StaffTabs";
import { StaffGrid } from "./staff/StaffGrid";

interface StaffMember {
  id: string;
  name: string;
  position?: string;
  designation?: string;
  mobile?: string;
  department?: string;
  secretariat_name?: string;
}

const useStaffQuery = (staffType: string) => {
  return useQuery({
    queryKey: [staffType + "-staff"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", staffType)
        .order("name");
      if (error) throw error;
      return data;
    },
  });
};

export const StaffContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: mandalOfficers, isLoading: isLoadingOfficers } = useStaffQuery("mandal_officer");
  const { data: sachivalayamStaff, isLoading: isLoadingSachivalayam } = useQuery({
    queryKey: ["sachivalayam-staff"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sachivalayam_staff")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
  const { data: revenueStaff, isLoading: isLoadingRevenue } = useStaffQuery("revenue");
  const { data: educationStaff, isLoading: isLoadingEducation } = useStaffQuery("education");
  const { data: healthStaff, isLoading: isLoadingHealth } = useStaffQuery("health");
  const { data: agricultureStaff, isLoading: isLoadingAgriculture } = useStaffQuery("agriculture");

  const filterStaff = (staff: StaffMember[] | null) => {
    if (!staff) return [];
    return staff.filter(member => 
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mobile?.includes(searchQuery) ||
      member.secretariat_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Staff Directory
        </CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Search by name, department, designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mandal" className="space-y-4">
          <StaffTabs />

          <TabsContent value="mandal">
            <StaffGrid 
              staff={filterStaff(mandalOfficers)} 
              isLoading={isLoadingOfficers} 
            />
          </TabsContent>

          <TabsContent value="sachivalayam">
            <StaffGrid 
              staff={filterStaff(sachivalayamStaff)} 
              isLoading={isLoadingSachivalayam} 
            />
          </TabsContent>

          <TabsContent value="revenue">
            <StaffGrid 
              staff={filterStaff(revenueStaff)} 
              isLoading={isLoadingRevenue} 
            />
          </TabsContent>

          <TabsContent value="education">
            <StaffGrid 
              staff={filterStaff(educationStaff)} 
              isLoading={isLoadingEducation} 
            />
          </TabsContent>

          <TabsContent value="health">
            <StaffGrid 
              staff={filterStaff(healthStaff)} 
              isLoading={isLoadingHealth} 
            />
          </TabsContent>

          <TabsContent value="agriculture">
            <StaffGrid 
              staff={filterStaff(agricultureStaff)} 
              isLoading={isLoadingAgriculture} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};