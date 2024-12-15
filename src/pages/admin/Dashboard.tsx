import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Table, ListTree, Link as LinkIcon, Plus, Pencil, Trash2, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleCreate = (tableName: string) => {
    toast.info(`Create operation for ${tableName}`);
    // Here you would typically open a modal or navigate to a create form
  };

  const handleView = async (tableName: string) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(10);
      
      if (error) throw error;
      
      console.log(`Data from ${tableName}:`, data);
      toast.success(`Viewing first 10 records from ${tableName}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleEdit = (tableName: string) => {
    toast.info(`Edit operation for ${tableName}`);
    // Here you would typically open a modal or navigate to an edit form
  };

  const handleDelete = (tableName: string) => {
    toast.info(`Delete operation for ${tableName}`);
    // Here you would typically show a confirmation dialog
  };

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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  <h2 className="font-semibold">{table.name}</h2>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleCreate(table.name)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Create new record</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleView(table.name)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View records</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(table.name)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit records</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(table.name)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete records</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="space-y-2">
                {table.columns.map((column) => (
                  <TooltipProvider key={column.name}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2 text-sm">
                          <ListTree className="h-4 w-4" />
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