import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "secretariat_name",
    header: "Secretariat Name",
  },
  {
    accessorKey: "secretariat_code",
    header: "Secretariat Code",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "cfms",
    header: "CFMS",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
];