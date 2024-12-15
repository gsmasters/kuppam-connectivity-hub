import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "../RichTextEditor";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface DatabaseSectionContent {
  id: string;
  section_id: string;
  content: {
    content: string;
  };
  version: number;
  is_published: boolean;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
}

export const AboutUsEditor = () => {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: sectionData, isLoading } = useQuery({
    queryKey: ['about-section'],
    queryFn: async () => {
      console.log('Fetching about page content...');
      
      // First ensure the page section exists
      const { data: pageSections, error: sectionError } = await supabase
        .from('page_sections')
        .select('id')
        .eq('page', 'about-us')
        .eq('section', 'main');

      if (sectionError) {
        console.error('Error fetching page section:', sectionError);
        throw sectionError;
      }

      let sectionId;
      
      if (!pageSections || pageSections.length === 0) {
        // Create the page section if it doesn't exist
        const { data: newSection, error: createError } = await supabase
          .from('page_sections')
          .insert({
            page: 'about-us',
            section: 'main',
            title: 'About Us',
            content_type: 'text',
            section_type: 'content'
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating page section:', createError);
          throw createError;
        }
        
        sectionId = newSection.id;
      } else {
        sectionId = pageSections[0].id;
      }

      // Then get the content
      const { data: contentData, error: contentError } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', sectionId)
        .eq('is_published', true)
        .order('version', { ascending: false })
        .limit(1);

      if (contentError) {
        console.error('Error fetching section content:', contentError);
        throw contentError;
      }

      console.log('Content fetched successfully:', contentData);
      
      if (!contentData || contentData.length === 0) {
        return { sectionId, content: "" };
      }

      const typedContent = contentData[0] as DatabaseSectionContent;
      return { 
        sectionId, 
        content: typedContent?.content?.content || "" 
      };
    },
    retry: 1
  });

  const handleSave = async () => {
    if (!sectionData?.sectionId) return;

    setSaving(true);
    try {
      const { data: versionData } = await supabase
        .from('section_content')
        .select('version')
        .eq('section_id', sectionData.sectionId)
        .order('version', { ascending: false })
        .limit(1);

      const newVersion = (versionData?.[0]?.version || 0) + 1;

      const { error } = await supabase
        .from('section_content')
        .insert({
          section_id: sectionData.sectionId,
          content: { content },
          version: newVersion,
          is_published: true
        });

      if (error) throw error;

      toast.success("Content published successfully");
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <RichTextEditor
        content={content || sectionData?.content || ""}
        onChange={setContent}
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="gap-2"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          <Save className="h-4 w-4" />
          Publish Changes
        </Button>
      </div>
    </div>
  );
};