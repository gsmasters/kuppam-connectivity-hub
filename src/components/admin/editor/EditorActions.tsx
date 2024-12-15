import { Button } from "@/components/ui/button";
import { Loader2, Save, Upload } from "lucide-react";

interface EditorActionsProps {
  onSave: () => void;
  onPublish: () => void;
  saving: boolean;
  hasUnsavedChanges: boolean;
}

export const EditorActions = ({
  onSave,
  onPublish,
  saving,
  hasUnsavedChanges
}: EditorActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        onClick={onSave}
        disabled={saving || !hasUnsavedChanges}
        variant="outline"
        className="gap-2"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        <Save className="h-4 w-4" />
        Save as Draft
      </Button>
      <Button
        onClick={onPublish}
        disabled={saving || !hasUnsavedChanges}
        className="gap-2"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        <Upload className="h-4 w-4" />
        Publish
      </Button>
    </div>
  );
};