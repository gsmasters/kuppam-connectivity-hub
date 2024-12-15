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
import { useQuery } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";

type TableNames = keyof Database['public']['Tables'];

const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState<TableNames | null>(null);

  const { data: tables, isLoading } = useQuery({
    queryKey: ['database-tables'],
    queryFn: async () => {
      const { data: tablesData, error } = await supabase
        .from('page_sections')
        .select('*')
        .limit(0);

      if (error) throw error;

      // Get the database schema from the types
      const dbSchema: Record<TableNames, {
        Row: any;
        Insert: any;
        Update: any;
        Relationships: any[];
      }> = (supabase.from('page_sections') as any).parent.tables;

      return Object.entries(dbSchema).map(([tableName, schema]) => ({
        name: tableName as TableNames,
        columns: Object.entries(schema.Row).map(([name, type]) => ({
          name,
          type: typeof type === 'object' ? 'object' : typeof type
        }))
      }));
    }
  });

  const handleCreate = (tableName: TableNames) => {
    toast.info(`Create operation for ${tableName}`);
    // Here you would typically open a modal or navigate to a create form
  };

  const handleView = async (tableName: TableNames) => {
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

  const handleEdit = (tableName: TableNames) => {
    toast.info(`Edit operation for ${tableName}`);
    // Here you would typically open a modal or navigate to an edit form
  };

  const handleDelete = (tableName: TableNames) => {
    toast.info(`Delete operation for ${tableName}`);
    // Here you would typically show a confirmation dialog
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-2 mb-6">
          <Database className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Loading Database Schema...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Database className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Database Schema</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] rounded-lg border">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables?.map((table) => (
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
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Type: {column.type}</p>
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