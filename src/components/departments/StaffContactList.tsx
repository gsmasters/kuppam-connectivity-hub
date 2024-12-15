import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import { StaffTabs } from "./staff/StaffTabs";
import { StaffGrid } from "./staff/StaffGrid";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { StaffMember, MandalStaff, SachivalayamStaff, ElectedRepresentative } from "@/types/staff";

function isMandalStaff(staff: StaffMember): staff is MandalStaff {
  return 'staff_type' in staff;
}

function isSachivalayamStaff(staff: StaffMember): staff is SachivalayamStaff {
  return 'secretariat_name' in staff;
}

function isElectedRepresentative(staff: StaffMember): staff is ElectedRepresentative {
  return 'representative_type' in staff;
}

export const StaffContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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
      return data;
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

  // Combine all staff data for search suggestions
  const allStaff = [
    ...(mandalOfficeStaff || []),
    ...(mandalOfficers || []),
    ...(sachivalayamStaff || []),
    ...(electedRepresentatives || [])
  ];

  // Enhanced search function
  const filterStaff = (staff: StaffMember[] | null) => {
    if (!staff) return [];
    if (!searchQuery.trim()) return staff;

    const query = searchQuery.toLowerCase().trim();
    return staff.filter(member => {
      const baseFields = [member.name, member.mobile];
      
      if (isMandalStaff(member)) {
        baseFields.push(member.position, member.department || '');
      }
      
      if (isSachivalayamStaff(member)) {
        baseFields.push(
          member.designation,
          member.secretariat_name,
          member.secretariat_code || ''
        );
      }
      
      if (isElectedRepresentative(member)) {
        baseFields.push(
          member.position,
          member.representative_type,
          member.gram_panchayat || '',
          member.panchayat_name || ''
        );
      }
      
      return baseFields.some(field => 
        field?.toLowerCase().includes(query)
      );
    });
  };

  // Get unique search suggestions
  const getSearchSuggestions = () => {
    const suggestions = new Set<string>();
    allStaff.forEach(member => {
      if (member.name) suggestions.add(member.name);
      if (member.mobile) suggestions.add(member.mobile);
      
      if (isMandalStaff(member)) {
        if (member.department) suggestions.add(member.department);
        if (member.position) suggestions.add(member.position);
      }
      
      if (isSachivalayamStaff(member)) {
        if (member.designation) suggestions.add(member.designation);
        if (member.secretariat_name) suggestions.add(member.secretariat_name);
      }
      
      if (isElectedRepresentative(member)) {
        if (member.position) suggestions.add(member.position);
        if (member.representative_type) suggestions.add(member.representative_type);
      }
    });
    
    return Array.from(suggestions)
      .filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 10); // Limit to 10 suggestions
  };

  // Calculate total staff count (only working staff)
  const totalWorkingStaff = (
    (mandalOfficeStaff?.filter(s => s.is_working !== false).length || 0) +
    (mandalOfficers?.filter(s => s.is_working !== false).length || 0) +
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
              Browse and search through mandal office staff, mandal level officers, sachivalayam staff, and elected representatives
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="font-medium">
              Total Working Staff: {totalWorkingStaff}
            </span>
          </div>
        </div>
        <div className="relative max-w-sm">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="Search by name, position, department..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            {searchQuery && (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {getSearchSuggestions().map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      onSelect={(value) => {
                        setSearchQuery(value);
                      }}
                    >
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mandal_office" className="space-y-6">
          <StaffTabs 
            counts={{
              mandal_office: mandalOfficeStaff?.filter(s => s.is_working !== false).length || 0,
              mandal_officers: mandalOfficers?.filter(s => s.is_working !== false).length || 0,
              sachivalayam: sachivalayamStaff?.length || 0,
              representatives: electedRepresentatives?.length || 0
            }}
          />

          <TabsContent value="mandal_office" className="mt-0 space-y-6">
            <StaffGrid 
              title="Mandal Office Staff"
              description="Key officials and staff members working in the mandal office"
              staff={filterStaff(mandalOfficeStaff)} 
              isLoading={isLoadingMandalOffice}
              showDepartment
              totalCount={mandalOfficeStaff?.length || 0}
              workingCount={mandalOfficeStaff?.filter(s => s.is_working !== false).length || 0}
            />
          </TabsContent>

          <TabsContent value="mandal_officers" className="mt-0 space-y-6">
            <StaffGrid 
              title="Mandal Level Officers"
              description="Officers working at the mandal level across different departments"
              staff={filterStaff(mandalOfficers)} 
              isLoading={isLoadingMandalOfficers}
              showDepartment
              totalCount={mandalOfficers?.length || 0}
              workingCount={mandalOfficers?.filter(s => s.is_working !== false).length || 0}
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
