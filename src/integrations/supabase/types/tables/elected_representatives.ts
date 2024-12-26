export interface ElectedRepresentativesTable {
  Row: {
    created_at: string | null;
    gram_panchayat: string | null;
    id: string;
    mobile: string | null;
    name: string;
    panchayat_name: string | null;
    position: string;
    representative_type: "MPP" | "ZPTC" | "Sarpanch" | "MPTC";
    updated_at: string | null;
  };
  Insert: {
    created_at?: string | null;
    gram_panchayat?: string | null;
    id?: string;
    mobile?: string | null;
    name: string;
    panchayat_name?: string | null;
    position: string;
    representative_type: "MPP" | "ZPTC" | "Sarpanch" | "MPTC";
    updated_at?: string | null;
  };
  Update: {
    created_at?: string | null;
    gram_panchayat?: string | null;
    id?: string;
    mobile?: string | null;
    name?: string;
    panchayat_name?: string | null;
    position?: string;
    representative_type?: "MPP" | "ZPTC" | "Sarpanch" | "MPTC";
    updated_at?: string | null;
  };
  Relationships: [];
}