import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Page } from "@/types/content";
import { usePageContent } from "./usePageContent";
import { usePageOperations } from "./usePageOperations";

export const usePageManager = () => {
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState(false);
  
  const {
    pageName,
    pageContent,
    selectedTemplate,
    setPageName,
    setPageContent,
    setSelectedTemplate,
    loadPageContent,
  } = usePageContent();

  const { createPage, updatePage } = usePageOperations();

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

  const { data: templates } = useQuery({
    queryKey: ["page-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_templates")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = async (page: Page) => {
    setEditingPage(page);
    setPageName(page.name);
    await loadPageContent(page);
  };

  const handleCancel = () => {
    setEditingPage(null);
    setNewPage(false);
    setPageName("");
    setPageContent("");
    setSelectedTemplate(null);
  };

  return {
    pages,
    isLoading,
    editingPage,
    newPage,
    pageName,
    pageContent,
    templates,
    selectedTemplate,
    setNewPage,
    setPageName,
    setPageContent,
    setSelectedTemplate,
    createPage,
    updatePage,
    handleEdit,
    handleCancel,
  };
};