import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";
import { RichTextEditor } from "../RichTextEditor";
import { PreviewDialog } from "../PreviewDialog";
import { Page } from "@/types/content";

interface PageFormProps {
  isEditing: boolean;
  pageName: string;
  pageContent: any;
  onPageNameChange: (name: string) => void;
  onPageContentChange: (content: any) => void;
  onSave: () => void;
  onCancel: () => void;
  editingPage: Page | null;
}

export const PageForm = ({
  isEditing,
  pageName,
  pageContent,
  onPageNameChange,
  onPageContentChange,
  onSave,
  onCancel,
  editingPage
}: PageFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingPage ? "Edit Page" : "Create New Page"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Page name"
            value={pageName}
            onChange={(e) => onPageNameChange(e.target.value)}
          />
          <Button
            onClick={onSave}
            disabled={!pageName.trim()}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {editingPage ? "Update" : "Create"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          {pageContent && (
            <PreviewDialog content={pageContent} />
          )}
        </div>
        
        <div className="mt-4">
          <RichTextEditor
            content={pageContent}
            onChange={onPageContentChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};