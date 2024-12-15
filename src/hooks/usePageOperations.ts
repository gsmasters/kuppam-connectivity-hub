import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { createPageSection } from "./page-operations/createPageSection";
import { SectionType } from "@/types/content";

export const usePageOperations = () => {
  const queryClient = useQueryClient();

  const createPage = useMutation({
    mutationFn: async ({ pageName, selectedTemplate }: { pageName: string, selectedTemplate: any }) => {
      // Create the page
      const { data: page, error: pageError } = await supabase
        .from("pages")
        .insert({
          name: pageName,
          slug: pageName.toLowerCase().replace(/ /g, "-"),
        })
        .select()
        .single();

      if (pageError) throw pageError;

      // If a template is selected, create sections based on the template
      if (selectedTemplate) {
        const sections = selectedTemplate.sections;
        for (const section of sections) {
          const sectionData = await createPageSection(
            page.id,
            section.type as SectionType,
            section.title,
            section.content_type
          );

          // Create initial content for the section
          const { error: contentError } = await supabase
            .from("section_content")
            .insert({
              section_id: sectionData.id,
              content: { content: "" },
              is_published: true,
              is_draft: false,
            });

          if (contentError) throw contentError;
        }
      } else {
        // Create a default content section
        const sectionData = await createPageSection(
          page.id,
          'content',
          'Main Content',
          'text'
        );

        // Create initial content for the section
        const { error: contentError } = await supabase
          .from("section_content")
          .insert({
            section_id: sectionData.id,
            content: { content: "" },
            is_published: true,
            is_draft: false,
          });

        if (contentError) throw contentError;
      }

      return page;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  const updatePage = useMutation({
    mutationFn: async ({
      pageId,
      pageName,
      pageContent,
    }: {
      pageId: string;
      pageName: string;
      pageContent: string;
    }) => {
      // Update the page name
      const { error: pageError } = await supabase
        .from("pages")
        .update({ name: pageName })
        .eq("id", pageId);

      if (pageError) throw pageError;

      // Get the content section
      const { data: sections } = await supabase
        .from("page_sections")
        .select("id")
        .eq("page", pageId)
        .eq("section", "content")
        .single();

      if (sections) {
        // Update the section content
        const { error: contentError } = await supabase
          .from("section_content")
          .insert({
            section_id: sections.id,
            content: { content: pageContent },
            is_published: true,
            is_draft: false,
          });

        if (contentError) throw contentError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  return {
    createPage,
    updatePage,
  };
};