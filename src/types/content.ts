export type SectionType = 'hero' | 'content' | 'programs' | 'stats' | 'staff' | 'contact' | 'about';

export interface Section {
  id: string;
  title: string;
  description: string | null;
  content_type: 'text' | 'image' | 'table' | 'hero' | 'stats' | 'programs' | 'staff' | 'features' | 'testimonials' | 'gallery' | 'pricing' | 'faq';
  section_type: SectionType;
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

export interface Page {
  id: string;
  name: string;
  slug: string;
}