import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PageSection } from "@/types/content";

export const useContentLoader = () => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [content, setContent] = useState<Record<string, any>>({});
  const [isDraft, setIsDraft] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const loadContent = useCallback(async () => {
    try {
      console.log("Loading sections and content...");
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .order('page');

      if (sectionsError) throw sectionsError;

      console.log("Sections loaded:", sectionsData?.length);

      const groupedSections = sectionsData?.reduce((acc: PageSection[], section) => {
        const pageIndex = acc.findIndex(p => p.id === section.page);
        if (pageIndex === -1) {
          acc.push({
            id: section.page,
            label: section.page.charAt(0).toUpperCase() + section.page.slice(1),
            sections: [section]
          });
        } else {
          acc[pageIndex].sections.push(section);
        }
        return acc;
      }, []);

      setSections(groupedSections || []);

      const { data: contentData, error: contentError } = await supabase
        .from('section_content')
        .select('*')
        .order('version', { ascending: false });

      if (contentError) throw contentError;

      console.log("Content entries loaded:", contentData?.length || 0);

      const contentMap: Record<string, any> = {};
      const draftMap: Record<string, boolean> = {};
      
      contentData?.forEach(item => {
        if (!contentMap[item.section_id]) {
          contentMap[item.section_id] = item.content;
          draftMap[item.section_id] = item.is_draft || false;
        }
      });

      setContent(contentMap);
      setIsDraft(draftMap);
    } catch (error) {
      console.error('Error in loadContent:', error);
      toast({
        title: "Error",
        description: "Failed to load content sections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    loading,
    sections,
    content,
    isDraft,
    loadContent,
    setContent,
    setIsDraft
  };
};