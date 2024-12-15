import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type StaffContent = Database['public']['Tables']['staff_content']['Row'];

export const useContentManagement = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<Record<string, any>>({});
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});

  useEffect(() => {
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
        console.log('Loaded content:', contentMap);
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

    loadContent();

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
          console.log('Real-time update received:', payload);
          if (payload.new && 'section' in payload.new && 'content' in payload.new) {
            const newRow = payload.new as StaffContent;
            setContent(prev => ({
              ...prev,
              [newRow.section]: newRow.content
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const saveContent = async (section: string, newContent: string) => {
    setSaving(true);
    try {
      // First check if content exists for this section
      const { data: existingContent } = await supabase
        .from('staff_content')
        .select('id, content')
        .eq('section', section)
        .maybeSingle();

      if (existingContent) {
        // Save to history before updating
        await supabase
          .from('staff_content_history')
          .insert({
            staff_content_id: existingContent.id,
            content: existingContent.content,
          });
      }

      // Update or insert new content
      const { error } = await supabase
        .from('staff_content')
        .upsert({
          section,
          content: newContent,
          is_published: true,
          updated_at: new Date().toISOString(),
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

  return {
    content,
    loading,
    saving,
    unsavedChanges,
    saveContent,
    markContentChanged
  };
};