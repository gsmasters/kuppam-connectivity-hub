import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface ProgramActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onAdd: () => void;
}

export const ProgramActions = ({ selectedCount, onDelete, onAdd }: ProgramActionsProps) => {
  return (
    <div className="flex gap-2">
      {selectedCount > 0 && (
        <Button 
          variant="destructive" 
          onClick={onDelete}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Selected ({selectedCount})
        </Button>
      )}
      <Button onClick={onAdd} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Program
      </Button>
    </div>
  );
};