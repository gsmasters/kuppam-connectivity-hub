export interface ElectedRepresentativesTable {
  Row: {
    created_at: string | null
    gram_panchayat: string | null
    id: string
    mobile: string | null
    name: string
    panchayat_name: string | null
    position: string
    representative_type: "MPP" | "ZPTC" | "Sarpanch" | "MPTC"
    updated_at: string | null
  }
  Insert: {
    created_at?: string | null
    gram_panchayat?: string | null
    id?: string
    mobile?: string | null
    name: string
    panchayat_name?: string | null
    position: string
    representative_type: "MPP" | "ZPTC" | "Sarpanch" | "MPTC"
    updated_at?: string | null
  }
  Update: {
    created_at?: string | null
    gram_panchayat?: string | null
    id?: string
    mobile?: string | null
    name?: string
    panchayat_name?: string | null
    position?: string
    representative_type?: "MPP" | "ZPTC" | "Sarpanch" | "MPTC"
    updated_at?: string | null
  }
  Relationships: []
}

export interface ProgramsTable {
  Row: {
    id: string
    title: string
    description: string
    image_url: string
    created_at: string
    updated_at: string
    is_active: boolean
  }
  Insert: {
    id?: string
    title: string
    description: string
    image_url: string
    created_at?: string
    updated_at?: string
    is_active?: boolean
  }
  Update: {
    id?: string
    title?: string
    description?: string
    image_url?: string
    created_at?: string
    updated_at?: string
    is_active?: boolean
  }
  Relationships: []
}

// Add other table interfaces here
