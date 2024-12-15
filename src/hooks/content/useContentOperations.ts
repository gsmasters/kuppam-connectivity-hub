import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useContentOperations = (
  content: Record<string, any>,
  setContent: (content: Record<string, any>) => void,
  setIsDraft: (isDraft: Record<string, boolean>) => void,
  setUnsavedChanges: (changes: Record<string, boolean>) => void
) => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

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
  }, [setContent, setUnsavedChanges]);

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
  }, [content, setIsDraft, setUnsavedChanges, toast]);

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
  }, [content, setIsDraft, setUnsavedChanges, toast]);

  return {
    saving,
    handleContentChange,
    handleSave,
    handlePublish
  };
};