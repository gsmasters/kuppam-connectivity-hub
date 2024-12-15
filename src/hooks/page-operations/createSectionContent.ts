import { supabase } from "@/integrations/supabase/client";

export const createSectionContent = async (
  sectionId: string,
  content: any = "",
  version: number = 1,
  isPublished: boolean = true
) => {
  const { error } = await supabase
    .from('section_content')
    .insert({
      section_id: sectionId,
      content,
      version,
      is_published: isPublished
    });

  if (error) throw error;
};