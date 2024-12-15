export interface Section {
  id: string;
  title: string;
  description: string | null;
  content_type: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff';
  layout_width: number | null;
  layout_height: number | null;
}

export interface PageSection {
  id: string;
  label: string;
  sections: Section[];
}

export interface SectionContent {
  section_id: string;
  content: any;
}