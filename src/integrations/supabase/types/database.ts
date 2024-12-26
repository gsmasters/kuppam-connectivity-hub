import { ProgramsTable } from './tables/programs';
import { ElectedRepresentativesTable } from './tables';

export interface Database {
  public: {
    Tables: {
      programs: ProgramsTable;
      elected_representatives: ElectedRepresentativesTable;
      page_sections: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"];
          created_at: string;
          description: string | null;
          id: string;
          layout_height: number | null;
          layout_width: number | null;
          page: string;
          section: string;
          section_type: Database["public"]["Enums"]["section_type"];
          title: string;
          updated_at: string;
        }
        Insert: {
          content_type: Database["public"]["Enums"]["content_type"];
          created_at?: string;
          description?: string | null;
          id?: string;
          layout_height?: number | null;
          layout_width?: number | null;
          page: string;
          section: string;
          section_type: Database["public"]["Enums"]["section_type"];
          title: string;
          updated_at?: string;
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"];
          created_at?: string;
          description?: string | null;
          id?: string;
          layout_height?: number | null;
          layout_width?: number | null;
          page?: string;
          section?: string;
          section_type?: Database["public"]["Enums"]["section_type"];
          title?: string;
          updated_at?: string;
        }
        Relationships: [];
      };
      page_sections_order: {
        Row: {
          created_at: string;
          id: string;
          order_index: number;
          page_id: string;
          section_id: string;
          updated_at: string;
        }
        Insert: {
          created_at?: string;
          id?: string;
          order_index: number;
          page_id: string;
          section_id: string;
          updated_at?: string;
        }
        Update: {
          created_at?: string;
          id?: string;
          order_index?: number;
          page_id?: string;
          section_id?: string;
          updated_at?: string;
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_order_page_id_fkey";
            columns: ["page_id"];
            isOneToOne: false;
            referencedRelation: "pages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "page_sections_order_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "page_sections";
            referencedColumns: ["id"];
          },
        ];
      };
      page_templates: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          sections: Json;
          updated_at: string;
        }
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          sections?: Json;
          updated_at?: string;
        }
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          sections?: Json;
          updated_at?: string;
        }
        Relationships: [];
      };
      pages: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
          updated_at: string;
        }
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
          updated_at?: string;
        }
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
        }
        Relationships: [];
      };
      section_content: {
        Row: {
          content: Json;
          created_at: string;
          id: string;
          is_draft: boolean | null;
          is_published: boolean | null;
          section_id: string | null;
          updated_at: string;
          version: number;
        }
        Insert: {
          content: Json;
          created_at?: string;
          id?: string;
          is_draft?: boolean | null;
          is_published?: boolean | null;
          section_id?: string | null;
          updated_at?: string;
          version?: number;
        }
        Update: {
          content?: Json;
          created_at?: string;
          id?: string;
          is_draft?: boolean | null;
          is_published?: boolean | null;
          section_id?: string | null;
          updated_at?: string;
          version?: number;
        }
        Relationships: [
          {
            foreignKeyName: "section_content_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "page_sections";
            referencedColumns: ["id"];
          },
        ];
      };
      staff: {
        Row: {
          created_at: string | null;
          department: string | null;
          id: string;
          is_working: boolean | null;
          mobile: string | null;
          name: string;
          position: string;
          staff_type: Database["public"]["Enums"]["staff_type"];
          updated_at: string | null;
        }
        Insert: {
          created_at?: string | null;
          department?: string | null;
          id?: string;
          is_working?: boolean | null;
          mobile?: string | null;
          name: string;
          position: string;
          staff_type: Database["public"]["Enums"]["staff_type"];
          updated_at?: string | null;
        }
        Update: {
          created_at?: string | null;
          department?: string | null;
          id?: string;
          is_working?: boolean | null;
          mobile?: string | null;
          name?: string;
          position?: string;
          staff_type?: Database["public"]["Enums"]["staff_type"];
          updated_at?: string | null;
        }
        Relationships: [];
      };
      staff_content: {
        Row: {
          content: Json;
          created_at: string;
          id: string;
          is_published: boolean | null;
          section: string;
          updated_at: string;
        }
        Insert: {
          content: Json;
          created_at?: string;
          id?: string;
          is_published?: boolean | null;
          section: string;
          updated_at?: string;
        }
        Update: {
          content?: Json;
          created_at?: string;
          id?: string;
          is_published?: boolean | null;
          section?: string;
          updated_at?: string;
        }
        Relationships: [];
      };
      staff_content_history: {
        Row: {
          content: Json;
          created_at: string;
          created_by: string | null;
          id: string;
          staff_content_id: string | null;
        }
        Insert: {
          content: Json;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          staff_content_id?: string | null;
        }
        Update: {
          content?: Json;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          staff_content_id?: string | null;
        }
        Relationships: [
          {
            foreignKeyName: "staff_content_history_staff_content_id_fkey";
            columns: ["staff_content_id"];
            isOneToOne: false;
            referencedRelation: "staff_content";
            referencedColumns: ["id"];
          },
        ];
      };
      website_content: {
        Row: {
          content: Json;
          created_at: string;
          id: string;
          page: string;
          section: string;
          updated_at: string;
        }
        Insert: {
          content: Json;
          created_at?: string;
          id?: string;
          page: string;
          section: string;
          updated_at?: string;
        }
        Update: {
          content?: Json;
          created_at?: string;
          id?: string;
          page?: string;
          section?: string;
          updated_at?: string;
        }
        Relationships: [];
      };
      website_sections: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          name: string;
          type: Database["public"]["Enums"]["section_type"];
          updated_at: string | null;
        }
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          type: Database["public"]["Enums"]["section_type"];
          updated_at?: string;
        }
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          type?: Database["public"]["Enums"]["section_type"];
          updated_at?: string;
        }
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      content_type: "text" | "image" | "table" | "hero" | "stats" | "programs" | "staff" | "features" | "testimonials" | "gallery" | "pricing" | "faq";
      notification_priority: "low" | "medium" | "high";
      representative_type: "MPP" | "ZPTC" | "Sarpanch" | "MPTC";
      section_type: "hero" | "content" | "programs" | "stats" | "staff" | "contact" | "about";
      staff_type: "mandal_office" | "panchayat_secretary" | "elected_representative" | "sachivalayam" | "mandal_officer" | "revenue" | "education" | "health" | "agriculture";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
