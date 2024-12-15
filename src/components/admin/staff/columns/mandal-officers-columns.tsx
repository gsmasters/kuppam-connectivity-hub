import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Officer Name",
  },
  {
    accessorKey: "position",
    header: "Designation",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-normal">
          {row.original.department}
        </Badge>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
    cell: ({ row }) => {
      return (
        <a 
          href={`tel:${row.original.mobile}`}
          className="text-blue-600 hover:underline"
        >
          {row.original.mobile}
        </a>
      );
    },
  },
  {
    accessorKey: "is_working",
    header: "Status",
    cell: ({ row }) => {
      return row.original.is_working ? (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Active
        </Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      );
    },
  },
];