import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { useState } from "react";
import { StaffTabs } from "./staff/StaffTabs";
import { StaffGrid } from "./staff/StaffGrid";
import { StaffSearch } from "./staff/StaffSearch";
import { useStaffDirectory } from "@/hooks/useStaffDirectory";
import { filterStaff, getSearchSuggestions } from "@/utils/staff-helpers";
import { StaffMember } from "@/types/staff";

export const StaffContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    mandalOfficeStaff,
    mandalOfficers,
    sachivalayamStaff,
    electedRepresentatives,
    isLoadingMandalOffice,
    isLoadingMandalOfficers,
    isLoadingSachivalayam,
    isLoadingRepresentatives,
  } = useStaffDirectory();

  const allStaff = [
    ...(mandalOfficeStaff || []),
    ...(mandalOfficers || []),
    ...(sachivalayamStaff || []),
    ...(electedRepresentatives || [])
  ];

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
            <CardDescription className="mt-2 text-base">
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
        <StaffSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          suggestions={getSearchSuggestions(allStaff, searchQuery)}
        />
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
              staff={filterStaff(mandalOfficeStaff, searchQuery)} 
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
              staff={filterStaff(mandalOfficers, searchQuery)} 
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
              staff={filterStaff(sachivalayamStaff, searchQuery)} 
              isLoading={isLoadingSachivalayam}
            />
          </TabsContent>

          <TabsContent value="representatives" className="mt-0 space-y-6">
            <StaffGrid 
              title="Elected Representatives"
              description="Elected officials serving the mandal"
              staff={filterStaff(electedRepresentatives, searchQuery)} 
              isLoading={isLoadingRepresentatives}
              isRepresentative
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
