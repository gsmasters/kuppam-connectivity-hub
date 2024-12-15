import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PageSectionList } from "./PageSectionList";
import { SectionEditor } from "./SectionEditor";

interface Section {
  id: string;
  title: string;
  description: string | null;
  content_type: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff';
  layout_width: number | null;
  layout_height: number | null;
}

interface PageSection {
  id: string;
  label: string;
  sections: Section[];
}

interface SectionContent {
  section_id: string;
  content: any;
}

export const ContentManager = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [content, setContent] = useState<Record<string, any>>({});
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    const loadSections = async () => {
      try {
        const { data: sectionsData, error } = await supabase
          .from('page_sections')
          .select('*')
          .order('page');

        if (error) throw error;

        // Group sections by page
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

        // Load content for all sections
        const { data: contentData, error: contentError } = await supabase
          .from('section_content')
          .select('*')
          .eq('is_published', true)
          .order('version', { ascending: false });

        if (contentError) throw contentError;

        const contentMap: Record<string, any> = {};
        contentData?.forEach(item => {
          if (!contentMap[item.section_id]) {
            contentMap[item.section_id] = item.content;
          }
        });

        setContent(contentMap);
      } catch (error) {
        console.error('Error loading sections:', error);
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

    // Subscribe to realtime updates
    const channel = supabase
      .channel('section_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'section_content'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          const newData = payload.new as SectionContent;
          if (newData && newData.section_id) {
            setContent(prev => ({
              ...prev,
              [newData.section_id]: newData.content
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleContentChange = (sectionId: string, newContent: any) => {
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
    setSaving(true);
    try {
      const { error } = await supabase
        .from('section_content')
        .insert({
          section_id: sectionId,
          content: content[sectionId],
          is_published: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content published successfully",
      });

      setUnsavedChanges(prev => ({
        ...prev,
        [sectionId]: false
      }));
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to publish content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (selectedSection) {
    return (
      <SectionEditor
        section={selectedSection}
        content={content[selectedSection.id]}
        onBack={() => setSelectedSection(null)}
        onContentChange={handleContentChange}
        onSave={handleSave}
        saving={saving}
        hasUnsavedChanges={unsavedChanges[selectedSection.id]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((page) => (
          <PageSectionList
            key={page.id}
            pageId={page.id}
            label={page.label}
            sections={page.sections}
            onSelectSection={setSelectedSection}
          />
        ))}
      </div>
    </div>
  );
};