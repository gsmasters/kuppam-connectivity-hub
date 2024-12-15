import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "../RichTextEditor";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { EditorActions } from "../editor/EditorActions";
import { useState } from "react";
import { toast } from "sonner";

export const AboutUsEditor = () => {
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: sectionData, isLoading } = useQuery({
    queryKey: ['about-section'],
    queryFn: async () => {
      const { data: sections } = await supabase
        .from('page_sections')
        .select('id')
        .eq('page', 'about-us')
        .eq('section', 'main')
        .single();

      if (!sections) throw new Error('Section not found');

      const { data: content } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', sections.id)
        .eq('is_published', true)
        .order('version', { ascending: false })
        .limit(1)
        .single();

      return { sectionId: sections.id, content: content?.content?.content || "" };
    }
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