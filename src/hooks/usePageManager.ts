import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Page } from "@/types/content";

export const usePageManager = () => {
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState(false);
  const [pageName, setPageName] = useState("");
  const [pageContent, setPageContent] = useState<any>("");
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

      const { data: newPage, error: fetchError } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .single();
      if (fetchError) throw fetchError;

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
      
      const { error: pageError } = await supabase
        .from("pages")
        .update({ name: pageName, slug })
        .eq("id", editingPage.id);
      if (pageError) throw pageError;

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

  return {
    pages,
    isLoading,
    editingPage,
    newPage,
    pageName,
    pageContent,
    setNewPage,
    setPageName,
    setPageContent,
    createPage,
    updatePage,
    handleEdit,
    handleCancel,
  };
};