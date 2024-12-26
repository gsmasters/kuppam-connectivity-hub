import { ElectedRepresentativesTable, ProgramsTable } from './tables'

export interface Database {
  public: {
    Tables: {
      elected_representatives: ElectedRepresentativesTable
      programs: ProgramsTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type: "text" | "image" | "table" | "hero" | "stats" | "programs" | "staff" | "features" | "testimonials" | "gallery" | "pricing" | "faq"
      notification_priority: "low" | "medium" | "high"
      representative_type: "MPP" | "ZPTC" | "Sarpanch" | "MPTC"
      section_type: "hero" | "content" | "programs" | "stats" | "staff" | "contact" | "about"
      staff_type: "mandal_office" | "panchayat_secretary" | "elected_representative" | "sachivalayam" | "mandal_officer" | "revenue" | "education" | "health" | "agriculture"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never
