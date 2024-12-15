import { useStaffData } from "@/hooks/useStaffData";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns/mandal-officers-columns";

export const MandalOfficers = () => {
  const { staff, isLoading } = useStaffData("mandal_officer");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={staff || []} />
    </div>
  );
};