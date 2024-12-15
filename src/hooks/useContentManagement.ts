import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Section, PageSection } from "@/types/content";

export const useContentManagement = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [content, setContent] = useState<Record<string, any>>({});
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});
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

  const refreshContent = useCallback(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleContentChange = useCallback((sectionId: string, newContent: any) => {
    console.log('Content change for section:', sectionId);
    setContent(prev => ({
      ...prev,
      [sectionId]: newContent
    }));
    setUnsavedChanges(prev => ({
      ...prev,
      [sectionId]: true
    }));
  }, []);

  const handleSave = useCallback(async (sectionId: string) => {
    console.log('Saving content for section:', sectionId);
    setSaving(true);
    try {
      const { data: currentVersionData, error: versionError } = await supabase
        .from('section_content')
        .select('version')
        .eq('section_id', sectionId)
        .order('version', { ascending: false })
        .limit(1);

      if (versionError) throw versionError;

      const newVersion = currentVersionData && currentVersionData[0] 
        ? currentVersionData[0].version + 1 
        : 1;

      const { error: insertError } = await supabase
        .from('section_content')
        .insert({
          section_id: sectionId,
          content: content[sectionId],
          version: newVersion,
          is_draft: true,
          is_published: false
        });

      if (insertError) throw insertError;

      setIsDraft(prev => ({
        ...prev,
        [sectionId]: true
      }));

      toast({
        title: "Success",
        description: "Content saved as draft",
      });

      setUnsavedChanges(prev => ({
        ...prev,
        [sectionId]: false
      }));
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [content, toast]);

  const handlePublish = useCallback(async (sectionId: string) => {
    console.log('Publishing content for section:', sectionId);
    setSaving(true);
    try {
      const { data: currentVersionData, error: versionError } = await supabase
        .from('section_content')
        .select('version')
        .eq('section_id', sectionId)
        .order('version', { ascending: false })
        .limit(1);

      if (versionError) throw versionError;

      const newVersion = currentVersionData && currentVersionData[0] 
        ? currentVersionData[0].version + 1 
        : 1;

      const { error: insertError } = await supabase
        .from('section_content')
        .insert({
          section_id: sectionId,
          content: content[sectionId],
          version: newVersion,
          is_draft: false,
          is_published: true
        });

      if (insertError) throw insertError;

      setIsDraft(prev => ({
        ...prev,
        [sectionId]: false
      }));

      toast({
        title: "Success",
        description: "Content published successfully",
      });

      setUnsavedChanges(prev => ({
        ...prev,
        [sectionId]: false
      }));
    } catch (error) {
      console.error('Error in handlePublish:', error);
      toast({
        title: "Error",
        description: "Failed to publish content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [content, toast]);

  return {
    selectedSection,
    setSelectedSection,
    loading,
    saving,
    sections,
    content,
    unsavedChanges,
    isDraft,
    handleContentChange,
    handleSave,
    handlePublish,
    refreshContent
  };
};