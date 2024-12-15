import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Save, X, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RichTextEditor } from "./RichTextEditor";
import { PreviewDialog } from "./PreviewDialog";

interface Page {
  id: string;
  name: string;
  slug: string;
}

export const PageManager = () => {
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState(false);
  const [pageName, setPageName] = useState("");
  const [pageContent, setPageContent] = useState("");
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
      const { error: pageError } = await supabase
        .from("pages")
        .insert([{ name: pageName, slug }]);
      if (pageError) throw pageError;

      // Get the created page to get its ID
      const { data: newPage, error: fetchError } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .single();
      if (fetchError) throw fetchError;

      // Create initial content for the page
      const { error: contentError } = await supabase
        .from("section_content")
        .insert([{
          section_id: newPage.id,
          content: pageContent,
          is_published: true,
          version: 1
        }]);
      if (contentError) throw contentError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      setNewPage(false);
      setPageName("");
      setPageContent("");
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
      
      // Update page details
      const { error: pageError } = await supabase
        .from("pages")
        .update({ name: pageName, slug })
        .eq("id", editingPage.id);
      if (pageError) throw pageError;

      // Update page content
      const { error: contentError } = await supabase
        .from("section_content")
        .insert([{
          section_id: editingPage.id,
          content: pageContent,
          is_published: true,
          version: 1
        }]);
      if (contentError) throw contentError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      setEditingPage(null);
      setPageName("");
      setPageContent("");
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

  const handleEdit = async (page: Page) => {
    setEditingPage(page);
    setPageName(page.name);
    
    // Fetch current content
    const { data, error } = await supabase
      .from("section_content")
      .select("content")
      .eq("section_id", page.id)
      .eq("is_published", true)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching content:", error);
      setPageContent("");
    } else {
      setPageContent(data?.content || "");
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
    setNewPage(false);
    setPageName("");
    setPageContent("");
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
            <CardContent className="space-y-4">
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
                {pageContent && (
                  <PreviewDialog content={pageContent} />
                )}
              </div>
              
              <div className="mt-4">
                <RichTextEditor
                  content={pageContent}
                  onChange={setPageContent}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {pages?.map((page) => (
          <Card key={page.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{page.name}</h3>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
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