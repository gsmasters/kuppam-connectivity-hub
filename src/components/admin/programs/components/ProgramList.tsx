import { Program } from "@/types/programs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";

interface ProgramListProps {
  programs: Program[];
  selectedPrograms: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onEdit: (program: Program) => void;
  onDelete: (ids: string[]) => void;
}

export const ProgramList = ({
  programs,
  selectedPrograms,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDelete,
}: ProgramListProps) => {
  const getFirstImageUrl = (imageUrl: string) => {
    try {
      return imageUrl?.split(',')[0]?.trim() || '/placeholder.svg';
    } catch (error) {
      console.error('Error parsing image URL:', error);
      return '/placeholder.svg';
    }
  };

  return (
    <div className="space-y-4">
      {programs?.length > 0 && (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedPrograms.length === programs.length}
            onCheckedChange={onSelectAll}
            aria-label="Select all programs"
          />
          <span className="text-sm text-muted-foreground">
            {selectedPrograms.length === programs.length 
              ? "Deselect all" 
              : "Select all"}
          </span>
        </div>
      )}

      <div className="grid gap-4">
        {programs?.map((program) => (
          <div
            key={program.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedPrograms.includes(program.id)}
                onCheckedChange={() => onToggleSelect(program.id)}
                aria-label={`Select ${program.title}`}
              />
              <div className="h-16 w-16 relative rounded overflow-hidden">
                <img
                  src={getFirstImageUrl(program.image_url)}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Error loading image:', program.image_url);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium">{program.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {program.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(program)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete([program.id])}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};