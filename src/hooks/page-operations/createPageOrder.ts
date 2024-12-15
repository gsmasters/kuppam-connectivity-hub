import { supabase } from "@/integrations/supabase/client";

export const createPageOrder = async (
  pageId: string,
  sectionId: string,
  orderIndex: number
) => {
  const { error } = await supabase
    .from("page_sections_order")
    .insert({
      page_id: pageId,
      section_id: sectionId,
      order_index: orderIndex
    });

  if (error) throw error;
};