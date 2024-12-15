import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Table, Column, Link as LinkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tables = [
  {
    name: "elected_representatives",
    columns: [
      { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()" },
      { name: "name", type: "varchar", nullable: false },
      { name: "position", type: "varchar", nullable: false },
      { name: "mobile", type: "varchar", nullable: true },
      { name: "representative_type", type: "enum", nullable: false },
      { name: "gram_panchayat", type: "varchar", nullable: true },
      { name: "panchayat_name", type: "varchar", nullable: true },
      { name: "created_at", type: "timestamp", nullable: true, default: "now()" },
      { name: "updated_at", type: "timestamp", nullable: true, default: "now()" }
    ]
  },
  {
    name: "notifications",
    columns: [
      { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()" },
      { name: "message", type: "text", nullable: false },
      { name: "active", type: "boolean", nullable: true, default: "true" },
      { name: "start_date", type: "timestamp", nullable: false },
      { name: "end_date", type: "timestamp", nullable: true },
      { name: "created_at", type: "timestamp", nullable: false },
      { name: "updated_at", type: "timestamp", nullable: false }
    ]
  },
  // ... Add more tables as needed
];

const relationships = [
  {
    from: { table: "staff_content_history", column: "staff_content_id" },
    to: { table: "staff_content", column: "id" }
  },
  {
    from: { table: "section_content", column: "section_id" },
    to: { table: "page_sections", column: "id" }
  },
  {
    from: { table: "page_sections_order", column: "page_id" },
    to: { table: "pages", column: "id" }
  },
  {
    from: { table: "page_sections_order", column: "section_id" },
    to: { table: "page_sections", column: "id" }
  }
];

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Database className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Database Schema</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] rounded-lg border">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <Card key={table.name} className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Table className="h-5 w-5" />
                <h2 className="font-semibold">{table.name}</h2>
              </div>
              
              <div className="space-y-2">
                {table.columns.map((column) => (
                  <TooltipProvider key={column.name}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2 text-sm">
                          <Column className="h-4 w-4" />
                          <span>{column.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({column.type})
                          </span>
                          {relationships.some(
                            (rel) =>
                              (rel.from.table === table.name &&
                                rel.from.column === column.name) ||
                              (rel.to.table === table.name &&
                                rel.to.column === column.name)
                          ) && <LinkIcon className="h-3 w-3 text-blue-500" />}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Type: {column.type}</p>
                        <p>Nullable: {column.nullable ? "Yes" : "No"}</p>
                        {column.default && <p>Default: {column.default}</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Dashboard;