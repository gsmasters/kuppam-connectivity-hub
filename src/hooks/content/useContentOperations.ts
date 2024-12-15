import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ContentRecord = Record<string, any>;
type BooleanRecord = Record<string, boolean>;
type SetStateAction<T> = T | ((prevState: T) => T);

export const useContentOperations = (
  content: ContentRecord,
  setContent: (value: SetStateAction<ContentRecord>) => void,
  setIsDraft: (value: SetStateAction<BooleanRecord>) => void,
  setUnsavedChanges: (value: SetStateAction<BooleanRecord>) => void
) => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleContentChange = useCallback((sectionId: string, newContent: any) => {
    console.log('Content change for section:', sectionId);
    setContent((prev: ContentRecord) => ({
      ...prev,
      [sectionId]: newContent
    }));
    setUnsavedChanges((prev: BooleanRecord) => ({
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

      setIsDraft((prev: BooleanRecord) => ({
        ...prev,
        [sectionId]: true
      }));

      toast({
        title: "Success",
        description: "Content saved as draft",
      });

      setUnsavedChanges((prev: BooleanRecord) => ({
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

      setIsDraft((prev: BooleanRecord) => ({
        ...prev,
        [sectionId]: false
      }));

      toast({
        title: "Success",
        description: "Content published successfully",
      });

      setUnsavedChanges((prev: BooleanRecord) => ({
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