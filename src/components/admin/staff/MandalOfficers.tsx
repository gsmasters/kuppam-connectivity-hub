import { useStaffData } from "@/hooks/useStaffData";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns/mandal-officers-columns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const MandalOfficers = () => {
  const { staff, isLoading } = useStaffData("mandal_officer");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = staff?.filter(officer => 
    officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    officer.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    officer.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    officer.mobile?.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading Mandal Officers...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Mandal Level Officers
        </CardTitle>
        <CardDescription>
          View and manage all mandal level officers and their departments. Use the search box below to filter by name, department, designation, or mobile number.
        </CardDescription>
        <div className="mt-4">
          <Input
            placeholder="Search officers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable 
          columns={columns} 
          data={filteredStaff || []}
        />
      </CardContent>
    </Card>
  );
};