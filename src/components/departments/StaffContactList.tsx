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
  
  // Queries for different staff types
  const { data: mandalOfficers, isLoading: isLoadingOfficers } = useQuery({
    queryKey: ["staff", "mandal_officer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "mandal_officer")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

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

  const { data: revenueStaff, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ["staff", "revenue"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "revenue")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: educationStaff, isLoading: isLoadingEducation } = useQuery({
    queryKey: ["staff", "education"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "education")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

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
    <Card className="shadow-lg border-none">
      <CardHeader className="space-y-6 pb-8 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Staff Directory</CardTitle>
            <CardDescription className="mt-2">
              Browse and search through all department staff and elected representatives
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="font-medium">
              Total Staff: {
                (mandalOfficers?.length || 0) +
                (sachivalayamStaff?.length || 0) +
                (revenueStaff?.length || 0) +
                (educationStaff?.length || 0) +
                (electedRepresentatives?.length || 0)
              }
            </span>
          </div>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search staff..."
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
              mandal: mandalOfficers?.length || 0,
              sachivalayam: sachivalayamStaff?.length || 0,
              revenue: revenueStaff?.length || 0,
              education: educationStaff?.length || 0,
              representatives: electedRepresentatives?.length || 0
            }}
          />

          <TabsContent value="mandal" className="mt-0 space-y-6">
            <StaffGrid 
              title="Mandal Officers"
              description="Key officials managing mandal-level operations"
              staff={filterStaff(mandalOfficers)} 
              isLoading={isLoadingOfficers}
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

          <TabsContent value="revenue" className="mt-0 space-y-6">
            <StaffGrid 
              title="Revenue Department"
              description="Officials handling revenue and land administration"
              staff={filterStaff(revenueStaff)} 
              isLoading={isLoadingRevenue}
            />
          </TabsContent>

          <TabsContent value="education" className="mt-0 space-y-6">
            <StaffGrid 
              title="Education Department"
              description="Staff managing educational institutions and programs"
              staff={filterStaff(educationStaff)} 
              isLoading={isLoadingEducation}
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