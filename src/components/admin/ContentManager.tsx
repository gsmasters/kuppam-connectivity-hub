import { useState, useEffect } from "react";
import { Loader2, FolderOpen, ArrowLeft, Eye } from "lucide-react";
import { PreviewDialog } from "./PreviewDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EditorView } from "./EditorView";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
          .select('section_id, content')
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
          if (payload.new) {
            setContent(prev => ({
              ...prev,
              [payload.new.section_id]: payload.new.content
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedSection(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{selectedSection.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedSection.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {content[selectedSection.id] && (
              <PreviewDialog content={content[selectedSection.id]} />
            )}
          </div>
        </div>

        <EditorView
          sectionId={selectedSection.id}
          contentType={selectedSection.content_type}
          layoutWidth={selectedSection.layout_width}
          layoutHeight={selectedSection.layout_height}
          existingContent={content[selectedSection.id] || ""}
          onContentChange={handleContentChange}
          onSave={() => handleSave(selectedSection.id)}
          saving={saving}
          hasUnsavedChanges={unsavedChanges[selectedSection.id]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                {page.label}
              </CardTitle>
              <CardDescription>
                {page.sections.length} section{page.sections.length !== 1 ? 's' : ''}
              </CardDescription>
              <div className="mt-4 space-y-2">
                {page.sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedSection(section)}
                  >
                    {section.title}
                  </Button>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};