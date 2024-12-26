export interface ProgramsTable {
  Row: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    title: string;
    description: string;
    image_url: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    title?: string;
    description?: string;
    image_url?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [];
}