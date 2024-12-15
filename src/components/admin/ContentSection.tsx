import { RichTextEditor } from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface ContentSectionProps {
  title: string;
  description: string;
  content: string;
  saving: boolean;
  hasUnsavedChanges: boolean;
  onContentChange: (content: string) => void;
  onSave: () => void;
}

export const ContentSection = ({
  title,
  description,
  content,
  saving,
  hasUnsavedChanges,
  onContentChange,
  onSave,
}: ContentSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RichTextEditor
          content={content}
          onChange={onContentChange}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={onSave}
          disabled={saving || !hasUnsavedChanges}
          className="gap-2"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          <Save className="h-4 w-4" />
          Publish Changes
        </Button>
      </CardFooter>
    </Card>
  );
};