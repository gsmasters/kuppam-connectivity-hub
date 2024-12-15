import { supabase } from "@/integrations/supabase/client";
import { SectionType } from "@/types/content";

export const createPageSection = async (
  pageId: string,
  sectionType: SectionType,
  title: string,
  contentType: 'text' | 'hero' | 'image' | 'table' | 'stats' | 'programs' | 'staff'
) => {
  const { data: section, error } = await supabase
    .from("page_sections")
    .insert({
      page: pageId,
      section: sectionType,
      title,
      content_type: contentType,
      section_type: sectionType
    })
    .select()
    .single();

  if (error) throw error;
  return section;
};