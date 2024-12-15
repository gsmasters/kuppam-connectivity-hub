import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "representative_type",
    header: "Type",
  },
  {
    accessorKey: "gram_panchayat",
    header: "Gram Panchayat",
  },
];