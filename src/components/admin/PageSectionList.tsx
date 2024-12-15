import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import { Section } from "@/types/content";

interface PageSectionListProps {
  pageId: string;
  label: string;
  sections: Section[];
  onSelectSection: (section: Section) => void;
}

export const PageSectionList = ({ pageId, label, sections, onSelectSection }: PageSectionListProps) => {
  // Format the label to be more user-friendly
  const displayLabel = label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' ');
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          {displayLabel}
        </CardTitle>
        <CardDescription>
          {sections.length} section{sections.length !== 1 ? 's' : ''}
        </CardDescription>
        <div className="mt-4 space-y-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => onSelectSection(section)}
            >
              {section.title}
            </Button>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};