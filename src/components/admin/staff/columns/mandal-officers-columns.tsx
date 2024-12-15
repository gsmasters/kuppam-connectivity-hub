import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Officer Name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        <div className="text-sm text-muted-foreground">{row.original.position}</div>
      </div>
    ),
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
    header: "Contact",
    cell: ({ row }) => {
      return row.original.mobile ? (
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-blue-600 hover:text-blue-800"
          asChild
        >
          <a href={`tel:${row.original.mobile}`}>
            <Phone className="h-4 w-4" />
            {row.original.mobile}
          </a>
        </Button>
      ) : (
        <span className="text-muted-foreground">No contact</span>
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