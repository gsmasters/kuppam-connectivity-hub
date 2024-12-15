import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
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

export const StaffContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Query for mandal office staff
  const { data: mandalOfficeStaff, isLoading: isLoadingMandal } = useQuery({
    queryKey: ["staff", "mandal_office"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "mandal_office")
        .order("department", { ascending: true })
        .order("position");
      if (error) throw error;
      return data;
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
      return data;
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
      return data;
    },
  });

  // Enhanced search function
  const filterStaff = (staff: StaffMember[] | null) => {
    if (!staff) return [];
    if (!searchQuery.trim()) return staff;

    const query = searchQuery.toLowerCase().trim();
    return staff.filter(member => {
      const searchFields = [
        member.name,
        member.position,
        member.designation,
        member.department,
        member.secretariat_name,
        member.mobile
      ];
      
      return searchFields.some(field => 
        field?.toLowerCase().includes(query)
      );
    });
  };

  // Calculate total staff count
  const totalStaffCount = (
    (mandalOfficeStaff?.length || 0) +
    (sachivalayamStaff?.length || 0) +
    (electedRepresentatives?.length || 0)
  );

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="space-y-6 pb-8 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Staff Directory</CardTitle>
            <CardDescription className="mt-2">
              Browse and search through mandal office staff, sachivalayam staff, and elected representatives
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="font-medium">
              Total Staff: {totalStaffCount}
            </span>
          </div>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, position, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mandal" className="space-y-6">
          <StaffTabs 
            counts={{
              mandal: mandalOfficeStaff?.length || 0,
              sachivalayam: sachivalayamStaff?.length || 0,
              representatives: electedRepresentatives?.length || 0
            }}
          />

          <TabsContent value="mandal" className="mt-0 space-y-6">
            <StaffGrid 
              title="Mandal Office Staff"
              description="Key officials and staff members working in the mandal office"
              staff={filterStaff(mandalOfficeStaff)} 
              isLoading={isLoadingMandal}
              showDepartment
            />
          </TabsContent>

          <TabsContent value="sachivalayam" className="mt-0 space-y-6">
            <StaffGrid 
              title="Sachivalayam Staff"
              description="Staff members working in various secretariats"
              staff={filterStaff(sachivalayamStaff)} 
              isLoading={isLoadingSachivalayam}
            />
          </TabsContent>

          <TabsContent value="representatives" className="mt-0 space-y-6">
            <StaffGrid 
              title="Elected Representatives"
              description="Elected officials serving the mandal"
              staff={filterStaff(electedRepresentatives)} 
              isLoading={isLoadingRepresentatives}
              isRepresentative
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};