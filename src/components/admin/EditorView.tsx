import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";

interface EditorViewProps {
  sectionId: string;
  existingContent: string;
  onContentChange: (sectionId: string, content: string) => void;
  onSave: () => void;
  saving: boolean;
  hasUnsavedChanges: boolean;
}

export const EditorView = ({
  sectionId,
  existingContent,
  onContentChange,
  onSave,
  saving,
  hasUnsavedChanges,
}: EditorViewProps) => {
  const [newContent, setNewContent] = useState("");

  return (
    <Tabs defaultValue="existing" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="existing">Edit Existing Content</TabsTrigger>
        <TabsTrigger value="new">Add New Content</TabsTrigger>
      </TabsList>

      <TabsContent value="existing">
        <Card>
          <CardHeader>
            <CardTitle>Edit Existing Content</CardTitle>
            <CardDescription>
              Modify the current content while maintaining its format and structure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RichTextEditor
              content={existingContent}
              onChange={(content) => onContentChange(sectionId, content)}
            />
            <div className="flex justify-end">
              <Button
                onClick={onSave}
                disabled={saving || !hasUnsavedChanges}
                className="gap-2"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                Publish Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>Add New Content</CardTitle>
            <CardDescription>
              Create new content that will be appended to the existing content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RichTextEditor
              content={newContent}
              onChange={setNewContent}
            />
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  const combinedContent = `${existingContent}\n${newContent}`;
                  onContentChange(sectionId, combinedContent);
                  setNewContent("");
                }}
                disabled={!newContent.trim()}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Add to Existing Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};