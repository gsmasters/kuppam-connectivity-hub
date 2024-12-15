import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "../RichTextEditor";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { EditorActions } from "../editor/EditorActions";
import { useState } from "react";
import { toast } from "sonner";

interface SectionContent {
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
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

      // Then get the content, handling the case where no content exists yet
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
      
      // Handle case where no content exists yet
      if (!contentData || contentData.length === 0) {
        return { sectionId, content: "" };
      }

      const typedContent = contentData[0] as SectionContent;
      return { 
        sectionId, 
        content: typedContent?.content?.content || "" 
      };
    },
    retry: 1
  });

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const handleSave = async (isDraft: boolean = true) => {
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
          is_draft: isDraft,
          is_published: !isDraft
        });

      if (error) throw error;

      toast.success(isDraft ? "Saved as draft" : "Changes published");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit About Us Page</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit About Us Page</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RichTextEditor
          content={content || sectionData?.content || ""}
          onChange={handleContentChange}
        />
        <EditorActions
          onSave={() => handleSave(true)}
          onPublish={() => handleSave(false)}
          saving={saving}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </CardContent>
    </Card>
  );
};