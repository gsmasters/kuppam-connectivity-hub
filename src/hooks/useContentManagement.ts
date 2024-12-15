import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useContentManagement = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<Record<string, any>>({});
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});

  const loadContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*');
      
      if (error) throw error;
      
      const contentMap: Record<string, any> = {};
      data?.forEach(item => {
        if (!contentMap[item.page]) {
          contentMap[item.page] = {};
        }
        contentMap[item.page][item.section] = item.content;
      });
      
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (page: string, section: string, newContent: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          page,
          section,
          content: newContent,
        }, {
          onConflict: 'page,section'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content published successfully",
      });

      setContent(prev => ({
        ...prev,
        [page]: {
          ...prev[page],
          [section]: newContent
        }
      }));

      setUnsavedChanges(prev => ({
        ...prev,
        [`${page}-${section}`]: false
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

  const markContentChanged = (page: string, section: string) => {
    setUnsavedChanges(prev => ({
      ...prev,
      [`${page}-${section}`]: true
    }));
  };

  useEffect(() => {
    loadContent();
  }, []);

  return {
    content,
    loading,
    saving,
    unsavedChanges,
    saveContent,
    markContentChanged
  };
};