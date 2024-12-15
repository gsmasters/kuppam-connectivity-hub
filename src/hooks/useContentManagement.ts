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
        .from('staff_content')
        .select('*');
      
      if (error) throw error;
      
      const contentMap: Record<string, any> = {};
      data?.forEach(item => {
        contentMap[item.section] = item.content;
      });
      
      setContent(contentMap);
      console.log('Loaded content:', contentMap); // Debug log
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

  const saveContent = async (section: string, newContent: string) => {
    setSaving(true);
    try {
      // First, save to history
      const { data: existingContent } = await supabase
        .from('staff_content')
        .select('id, content')
        .eq('section', section)
        .single();

      if (existingContent) {
        await supabase
          .from('staff_content_history')
          .insert({
            staff_content_id: existingContent.id,
            content: existingContent.content,
          });
      }

      // Then update or insert new content
      const { error } = await supabase
        .from('staff_content')
        .upsert({
          section,
          content: newContent,
          is_published: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'section'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content published successfully",
      });

      setContent(prev => ({
        ...prev,
        [section]: newContent
      }));

      setUnsavedChanges(prev => ({
        ...prev,
        [section]: false
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

  const markContentChanged = (section: string) => {
    setUnsavedChanges(prev => ({
      ...prev,
      [section]: true
    }));
  };

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel('staff_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff_content'
        },
        (payload) => {
          console.log('Real-time update received:', payload); // Debug log
          if (payload.new) {
            setContent(prev => ({
              ...prev,
              [payload.new.section]: payload.new.content
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load initial content
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