import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

  const { data: healthStaff, isLoading: isLoadingHealth } = useQuery({
    queryKey: ["staff", "health"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "health")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: agricultureStaff, isLoading: isLoadingAgriculture } = useQuery({
    queryKey: ["staff", "agriculture"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "agriculture")
        .order("name");
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
      <CardHeader className="space-y-6 pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight">Staff Directory</CardTitle>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-none"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mandal" className="space-y-6">
          <StaffTabs />

          <TabsContent value="mandal" className="mt-0 space-y-6">
            <StaffGrid 
              staff={filterStaff(mandalOfficers)} 
              isLoading={isLoadingOfficers} 
            />
          </TabsContent>

          <TabsContent value="sachivalayam" className="mt-0 space-y-6">
            <StaffGrid 
              staff={filterStaff(sachivalayamStaff)} 
              isLoading={isLoadingSachivalayam} 
            />
          </TabsContent>

          <TabsContent value="revenue" className="mt-0 space-y-6">
            <StaffGrid 
              staff={filterStaff(revenueStaff)} 
              isLoading={isLoadingRevenue} 
            />
          </TabsContent>

          <TabsContent value="education" className="mt-0 space-y-6">
            <StaffGrid 
              staff={filterStaff(educationStaff)} 
              isLoading={isLoadingEducation} 
            />
          </TabsContent>

          <TabsContent value="health" className="mt-0 space-y-6">
            <StaffGrid 
              staff={filterStaff(healthStaff)} 
              isLoading={isLoadingHealth} 
            />
          </TabsContent>

          <TabsContent value="agriculture" className="mt-0 space-y-6">
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