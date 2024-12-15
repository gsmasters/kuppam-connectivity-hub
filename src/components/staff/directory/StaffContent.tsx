import { Tabs, TabsContent } from "@/components/ui/tabs";
import { StaffGrid } from "@/components/departments/staff/StaffGrid";
import { filterStaff } from "@/utils/staff-helpers";
import { StaffMember } from "@/types/staff";

interface StaffContentProps {
  activeTab: string;
  searchQuery: string;
  mandalOfficers: StaffMember[] | undefined;
  mandalOfficeStaff: StaffMember[] | undefined;
  sachivalayamStaff: StaffMember[] | undefined;
  electedRepresentatives: StaffMember[] | undefined;
  isLoadingMandalOfficers: boolean;
  isLoadingMandalOffice: boolean;
  isLoadingSachivalayam: boolean;
  isLoadingRepresentatives: boolean;
}

export const StaffContent = ({
  activeTab,
  searchQuery,
  mandalOfficers,
  mandalOfficeStaff,
  sachivalayamStaff,
  electedRepresentatives,
  isLoadingMandalOfficers,
  isLoadingMandalOffice,
  isLoadingSachivalayam,
  isLoadingRepresentatives,
}: StaffContentProps) => {
  return (
    <Tabs value={activeTab} className="space-y-6">
      <TabsContent value="mandal_officers" className="mt-6 space-y-6 px-4 sm:px-0">
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

      <TabsContent value="mandal_office" className="mt-6 space-y-6 px-4 sm:px-0">
        <StaffGrid 
          title="Mandal Office Staff"
          description="Administrative staff working in the mandal office"
          staff={filterStaff(mandalOfficeStaff, searchQuery)} 
          isLoading={isLoadingMandalOffice}
          showDepartment
          totalCount={mandalOfficeStaff?.length || 0}
          workingCount={mandalOfficeStaff?.filter(s => s.is_working !== false).length || 0}
        />
      </TabsContent>

      <TabsContent value="sachivalayam" className="mt-6 space-y-6 px-4 sm:px-0">
        <StaffGrid 
          title="Sachivalayam Staff"
          description="Staff members working in various secretariats"
          staff={filterStaff(sachivalayamStaff, searchQuery)} 
          isLoading={isLoadingSachivalayam}
        />
      </TabsContent>

      <TabsContent value="representatives" className="mt-6 space-y-6 px-4 sm:px-0">
        <StaffGrid 
          title="Elected Representatives"
          description="Elected officials serving the mandal"
          staff={filterStaff(electedRepresentatives, searchQuery)} 
          isLoading={isLoadingRepresentatives}
          isRepresentative
        />
      </TabsContent>
    </Tabs>
  );
};