import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Page } from "@/types/content";

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
      const { data: section, error: sectionError } = await supabase
        .from("page_sections")
        .insert({
          page: newPage.id,
          section: 'content',
          title: 'Main Content',
          content_type: 'text',
          section_type: 'content'
        })
        .select()
        .single();

      if (sectionError) throw sectionError;

      // Create initial content for the section
      const { error: contentError } = await supabase
        .from('section_content')
        .insert({
          section_id: section.id,
          content: "",
          version: 1,
          is_published: true
        });

      if (contentError) throw contentError;

      if (selectedTemplate) {
        const { data: templates } = await supabase
          .from("page_templates")
          .select("*");

        const template = templates?.find(t => t.id === selectedTemplate);
        
        if (template) {
          const sections = template.sections as string[];
          
          for (let i = 0; i < sections.length; i++) {
            const sectionType = sections[i];
            const { data: templateSection, error: templateSectionError } = await supabase
              .from("page_sections")
              .insert({
                page: newPage.id,
                section: sectionType,
                title: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
                content_type: sectionType === 'hero' ? 'hero' : 'text',
                section_type: sectionType
              })
              .select()
              .single();

            if (templateSectionError) throw templateSectionError;

            // Create initial content for template section
            const { error: templateContentError } = await supabase
              .from('section_content')
              .insert({
                section_id: templateSection.id,
                content: "",
                version: 1,
                is_published: true
              });

            if (templateContentError) throw templateContentError;

            const { error: orderError } = await supabase
              .from("page_sections_order")
              .insert({
                page_id: newPage.id,
                section_id: templateSection.id,
                order_index: i
              });

            if (orderError) throw orderError;
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
      
      // Update page name and slug
      const { error: pageError } = await supabase
        .from("pages")
        .update({ name: pageName, slug })
        .eq("id", pageId);

      if (pageError) throw pageError;

      // Get or create a page section for this page
      const { data: existingSection } = await supabase
        .from("page_sections")
        .select()
        .eq("page", pageId)
        .eq("section", "content")
        .single();

      let sectionId;
      
      if (!existingSection) {
        const { data: newSection, error: sectionError } = await supabase
          .from("page_sections")
          .insert({
            page: pageId,
            section: "content",
            title: "Main Content",
            content_type: "text",
            section_type: "content"
          })
          .select()
          .single();

        if (sectionError) throw sectionError;
        sectionId = newSection.id;
      } else {
        sectionId = existingSection.id;
      }

      // Get current version
      const { data: currentVersionData } = await supabase
        .from('section_content')
        .select('version')
        .eq('section_id', sectionId)
        .order('version', { ascending: false })
        .limit(1);

      const newVersion = currentVersionData && currentVersionData[0] 
        ? currentVersionData[0].version + 1 
        : 1;

      // Insert new content version
      const { error: contentError } = await supabase
        .from('section_content')
        .insert({
          section_id: sectionId,
          content: pageContent,
          version: newVersion,
          is_published: true
        });

      if (contentError) throw contentError;
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