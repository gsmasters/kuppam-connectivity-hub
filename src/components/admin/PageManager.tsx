import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Page {
  id: string;
  name: string;
  slug: string;
}

export const PageManager = () => {
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState(false);
  const [pageName, setPageName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Page[];
    },
  });

  const createPage = useMutation({
    mutationFn: async () => {
      const slug = pageName.toLowerCase().replace(/\s+/g, "-");
      const { error } = await supabase
        .from("pages")
        .insert([{ name: pageName, slug }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      setNewPage(false);
      setPageName("");
      toast({
        title: "Success",
        description: "Page created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create page",
        variant: "destructive",
      });
      console.error("Error creating page:", error);
    },
  });

  const updatePage = useMutation({
    mutationFn: async () => {
      if (!editingPage) return;
      const slug = pageName.toLowerCase().replace(/\s+/g, "-");
      const { error } = await supabase
        .from("pages")
        .update({ name: pageName, slug })
        .eq("id", editingPage.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      setEditingPage(null);
      setPageName("");
      toast({
        title: "Success",
        description: "Page updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive",
      });
      console.error("Error updating page:", error);
    },
  });

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setPageName(page.name);
  };

  const handleCancel = () => {
    setEditingPage(null);
    setNewPage(false);
    setPageName("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        {!newPage && !editingPage && (
          <Button onClick={() => setNewPage(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {(newPage || editingPage) && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingPage ? "Edit Page" : "Create New Page"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Page name"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (editingPage) {
                      updatePage.mutate();
                    } else {
                      createPage.mutate();
                    }
                  }}
                  disabled={!pageName.trim()}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingPage ? "Update" : "Create"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {pages?.map((page) => (
          <Card key={page.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-medium">{page.name}</h3>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleEdit(page)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};