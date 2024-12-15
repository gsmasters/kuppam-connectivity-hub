import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Page } from "@/types/content";

export const usePageContent = () => {
  const [pageName, setPageName] = useState("");
  const [pageContent, setPageContent] = useState<any>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const loadPageContent = async (page: Page) => {
    try {
      const { data, error } = await supabase
        .from("section_content")
        .select("content")
        .eq("section_id", page.id)
        .eq("is_published", true)
        .order("version", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (!data || data.length === 0) {
        setPageContent("");
        return;
      }

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

  return {
    pageName,
    pageContent,
    selectedTemplate,
    setPageName,
    setPageContent,
    setSelectedTemplate,
    loadPageContent,
  };
};