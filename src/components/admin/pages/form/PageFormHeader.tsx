import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { PreviewDialog } from "../../PreviewDialog";
import { Page } from "@/types/content";

interface PageFormHeaderProps {
  editingPage: Page | null;
  pageContent: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export const PageFormHeader = ({ 
  editingPage, 
  pageContent, 
  onCancel, 
  onSubmit 
}: PageFormHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-2xl font-semibold">
        {editingPage ? "Edit Page" : "Create New Page"}
      </h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {editingPage ? "Update" : "Create"}
        </Button>
        {pageContent && (
          <PreviewDialog content={pageContent} />
        )}
      </div>
    </div>
  );
};