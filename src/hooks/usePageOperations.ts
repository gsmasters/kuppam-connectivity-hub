import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Page, SectionType } from "@/types/content";
import { createPageSection } from "./page-operations/createPageSection";
import { createSectionContent } from "./page-operations/createSectionContent";
import { createPageOrder } from "./page-operations/createPageOrder";

export const usePageOperations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createPage = useMutation({
    mutationFn: async ({ pageName, selectedTemplate }: { pageName: string; selectedTemplate: string | null }) => {
      const slug = pageName.toLowerCase().replace(/\s+/g, "-");
      
      const { data: newPage, error: pageError } = await supabase
        .from("pages")
        .insert([{ name: pageName, slug }])
        .select()
        .single();

      if (pageError) throw pageError;

      // Create initial page section
      const section = await createPageSection(
        newPage.id,
        'content' as SectionType,
        'Main Content',
        'text'
      );

      await createSectionContent(section.id);

      if (selectedTemplate) {
        const { data: templates } = await supabase
          .from("page_templates")
          .select("*");

        const template = templates?.find(t => t.id === selectedTemplate);
        
        if (template) {
          const sections = template.sections as SectionType[];
          
          for (let i = 0; i < sections.length; i++) {
            const sectionType = sections[i];
            const templateSection = await createPageSection(
              newPage.id,
              sectionType,
              sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
              sectionType === 'hero' ? 'hero' : 'text'
            );

            await createSectionContent(templateSection.id);
            await createPageOrder(newPage.id, templateSection.id, i);
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      toast({
        title: "Success",
        description: "Page created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create page",
        variant: "destructive",
      });
      console.error("Error creating page:", error);
    },
  });

  const updatePage = useMutation({
    mutationFn: async ({ pageId, pageName, pageContent }: { pageId: string; pageName: string; pageContent: any }) => {
      const slug = pageName.toLowerCase().replace(/\s+/g, "-");
      
      const { error: pageError } = await supabase
        .from("pages")
        .update({ name: pageName, slug })
        .eq("id", pageId);

      if (pageError) throw pageError;

      const { data: existingSection } = await supabase
        .from("page_sections")
        .select()
        .eq("page", pageId)
        .eq("section", "content")
        .single();

      let sectionId;
      
      if (!existingSection) {
        const section = await createPageSection(
          pageId,
          'content' as SectionType,
          'Main Content',
          'text'
        );
        sectionId = section.id;
      } else {
        sectionId = existingSection.id;
      }

      const { data: currentVersionData } = await supabase
        .from('section_content')
        .select('version')
        .eq('section_id', sectionId)
        .order('version', { ascending: false })
        .limit(1);

      const newVersion = currentVersionData && currentVersionData[0] 
        ? currentVersionData[0].version + 1 
        : 1;

      await createSectionContent(sectionId, pageContent, newVersion, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      toast({
        title: "Success",
        description: "Page updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive",
      });
      console.error("Error updating page:", error);
    },
  });

  return {
    createPage,
    updatePage,
  };
};