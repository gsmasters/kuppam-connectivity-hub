import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { StaffTabs } from "./staff/StaffTabs";
import { useStaffDirectory } from "@/hooks/useStaffDirectory";
import { getSearchSuggestions } from "@/utils/staff-helpers";
import { StaffHeader } from "@/components/staff/directory/StaffHeader";
import { StaffSearchBar } from "@/components/staff/directory/StaffSearchBar";
import { StaffContent } from "@/components/staff/directory/StaffContent";

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
        <StaffHeader totalWorkingStaff={totalWorkingStaff} />
        <StaffSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          suggestions={getSearchSuggestions(allStaff, searchQuery)}
        />
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="px-4 sm:px-0">
          <StaffTabs 
            counts={{
              mandal_office: mandalOfficeStaff?.filter(s => s.is_working !== false).length || 0,
              mandal_officers: mandalOfficers?.filter(s => s.is_working !== false).length || 0,
              sachivalayam: sachivalayamStaff?.length || 0,
              representatives: electedRepresentatives?.length || 0
            }}
          />
        </div>
        <StaffContent
          searchQuery={searchQuery}
          mandalOfficers={mandalOfficers}
          sachivalayamStaff={sachivalayamStaff}
          electedRepresentatives={electedRepresentatives}
          isLoadingMandalOfficers={isLoadingMandalOfficers}
          isLoadingSachivalayam={isLoadingSachivalayam}
          isLoadingRepresentatives={isLoadingRepresentatives}
        />
      </CardContent>
    </Card>
  );
};