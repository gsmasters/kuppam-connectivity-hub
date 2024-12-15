import { useStaffData } from "@/hooks/useStaffData";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns/mandal-office-columns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Define the hierarchy order
const POSITION_HIERARCHY = [
  "Mandal Parishad Development Officer",
  "MPDO",
  "Revenue Divisional Officer",
  "RDO",
  "Mandal Revenue Officer",
  "MRO",
  "Deputy Tahsildar",
  "Senior Assistant",
  "Junior Assistant",
  "Office Subordinate",
  "Attender",
  "Office Subordinate",
  // Add other positions in order of hierarchy
];

export const MandalOfficeStaff = () => {
  const { staff, isLoading } = useStaffData("mandal_office");
  const [searchQuery, setSearchQuery] = useState("");

  const sortByHierarchy = (staffList: any[]) => {
    return [...staffList].sort((a, b) => {
      // Normalize positions by converting to uppercase and removing extra spaces
      const normalizePosition = (pos: string) => pos.trim().toUpperCase();
      
      // Get positions from the hierarchy list (checking both full and abbreviated forms)
      const getPosIndex = (position: string) => {
        const normalizedPos = normalizePosition(position);
        return POSITION_HIERARCHY.findIndex(p => 
          normalizePosition(p) === normalizedPos ||
          normalizePosition(p).includes(normalizedPos) ||
          normalizedPos.includes(normalizePosition(p))
        );
      };

      const posA = getPosIndex(a.position);
      const posB = getPosIndex(b.position);

      // If neither position is found in hierarchy, sort alphabetically
      if (posA === -1 && posB === -1) return a.position.localeCompare(b.position);
      // If only one position is not found, put it at the end
      if (posA === -1) return 1;
      if (posB === -1) return -1;
      // Sort by hierarchy position
      return posA - posB;
    });
  };

  const filteredStaff = staff?.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.mobile?.includes(searchQuery)
  );

  const sortedStaff = filteredStaff ? sortByHierarchy(filteredStaff) : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading Mandal Office Staff...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-green-600" />
          Mandal Office Staff
        </CardTitle>
        <CardDescription>
          View and manage mandal office staff members organized by their hierarchical positions
        </CardDescription>
        <div className="mt-4">
          <Input
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable 
          columns={columns} 
          data={sortedStaff}
        />
      </CardContent>
    </Card>
  );
};