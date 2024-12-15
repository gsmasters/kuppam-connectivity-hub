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
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
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

  const createPage = useMutation({
    mutationFn: async () => {
      const slug = pageName.toLowerCase().replace(/\s+/g, "-");
      
      // First create the page
      const { data: newPage, error: pageError } = await supabase
        .from("pages")
        .insert([{ name: pageName, slug }])
        .select()
        .single();

      if (pageError) throw pageError;

      // If a template was selected, create the sections
      if (selectedTemplate && templates) {
        const template = templates.find(t => t.id === selectedTemplate);
        if (template) {
          const sections = template.sections as string[];
          
          // Create sections based on template
          for (let i = 0; i < sections.length; i++) {
            const sectionType = sections[i];
            const { data: section, error: sectionError } = await supabase
              .from("page_sections")
              .insert({
                page: newPage.id,
                section: sectionType,
                title: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
                content_type: sectionType === 'hero' ? 'hero' : 'text',
              })
              .select()
              .single();

            if (sectionError) throw sectionError;

            // Create section order
            const { error: orderError } = await supabase
              .from("page_sections_order")
              .insert({
                page_id: newPage.id,
                section_id: section.id,
                order_index: i
              });

            if (orderError) throw orderError;
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      setNewPage(false);
      setPageName("");
      setPageContent("");
      setSelectedTemplate(null);
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
    
    try {
      const { data, error } = await supabase
        .from("section_content")
        .select("content")
        .eq("section_id", page.id)
        .eq("is_published", true)
        .order("version", { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      // If no content exists, set empty content
      if (!data || data.length === 0) {
        setPageContent("");
        return;
      }

      // Use the first result if it exists
      setPageContent(data[0]?.content || "");
    } catch (error) {
      console.error("Error fetching content:", error);
      setPageContent("");
      toast({
        title: "Warning",
        description: "Could not load existing content",
        variant: "destructive",
      });
    }
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