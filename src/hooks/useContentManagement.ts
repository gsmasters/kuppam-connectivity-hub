import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Section, PageSection, SectionContent } from "@/types/content";

export const useContentManagement = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [content, setContent] = useState<Record<string, any>>({});
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Load sections and content
  useEffect(() => {
    const loadSections = async () => {
      try {
        console.log("Loading sections and content...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.error("No session found");
          toast({
            title: "Authentication Required",
            description: "Please log in to manage content",
            variant: "destructive",
          });
          return;
        }

        // First load sections
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('page_sections')
          .select('*')
          .order('page');

        if (sectionsError) {
          console.error("Error loading sections:", sectionsError);
          throw sectionsError;
        }

        if (!sectionsData || sectionsData.length === 0) {
          console.log("No sections found");
          toast({
            title: "No Content Sections",
            description: "No content sections are configured",
            variant: "destructive",
          });
          return;
        }

        console.log("Sections loaded:", sectionsData.length);

        const groupedSections = sectionsData.reduce((acc: PageSection[], section) => {
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

        setSections(groupedSections);

        // Then load content
        const { data: contentData, error: contentError } = await supabase
          .from('section_content')
          .select('*')
          .eq('is_published', true)
          .order('version', { ascending: false });

        if (contentError) {
          console.error("Error loading content:", contentError);
          throw contentError;
        }

        console.log("Content entries loaded:", contentData?.length || 0);

        const contentMap: Record<string, any> = {};
        contentData?.forEach(item => {
          if (!contentMap[item.section_id]) {
            contentMap[item.section_id] = item.content;
          }
        });

        setContent(contentMap);
      } catch (error) {
        console.error('Error in loadSections:', error);
        toast({
          title: "Error",
          description: "Failed to load content sections",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSections();

    // Set up real-time subscription
    const channel = supabase
      .channel('section_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'section_content',
          filter: 'is_published=true'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          const newData = payload.new as SectionContent;
          if (newData && newData.section_id) {
            console.log('Updating content for section:', newData.section_id);
            setContent(prev => ({
              ...prev,
              [newData.section_id]: newData.content
            }));
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      console.log('Cleaning up realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleContentChange = (sectionId: string, newContent: any) => {
    console.log('Content change for section:', sectionId);
    setContent(prev => ({
      ...prev,
      [sectionId]: newContent
    }));
    setUnsavedChanges(prev => ({
      ...prev,
      [sectionId]: true
    }));
  };

  const handleSave = async (sectionId: string) => {
    console.log('Saving content for section:', sectionId);
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error('No session found during save');
        toast({
          title: "Authentication Required",
          description: "Please log in to save content",
          variant: "destructive",
        });
        return;
      }

      // Get the current version number
      const { data: currentVersionData, error: versionError } = await supabase
        .from('section_content')
        .select('version')
        .eq('section_id', sectionId)
        .order('version', { ascending: false })
        .limit(1);

      if (versionError) {
        console.error('Error getting current version:', versionError);
        throw versionError;
      }

      const newVersion = currentVersionData && currentVersionData[0] 
        ? currentVersionData[0].version + 1 
        : 1;

      console.log('Publishing new version:', newVersion);

      // Insert new version
      const { error: insertError } = await supabase
        .from('section_content')
        .insert({
          section_id: sectionId,
          content: content[sectionId],
          version: newVersion,
          is_published: true
        });

      if (insertError) {
        console.error('Error publishing content:', insertError);
        if (insertError.code === '42501') {
          toast({
            title: "Permission Denied",
            description: "You don't have permission to publish content",
            variant: "destructive",
          });
        } else {
          throw insertError;
        }
        return;
      }

      console.log('Content published successfully');
      toast({
        title: "Success",
        description: "Content published successfully",
      });

      setUnsavedChanges(prev => ({
        ...prev,
        [sectionId]: false
      }));
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast({
        title: "Error",
        description: "Failed to publish content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    selectedSection,
    setSelectedSection,
    loading,
    saving,
    sections,
    content,
    unsavedChanges,
    handleContentChange,
    handleSave
  };
};