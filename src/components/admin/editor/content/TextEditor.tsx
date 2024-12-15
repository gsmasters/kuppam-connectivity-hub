import { RichTextEditor } from "../../RichTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickFormatButtons } from "./QuickFormatButtons";

interface TextEditorProps {
  sectionId: string;
  existingContent: string;
  onContentChange: (sectionId: string, content: string) => void;
}

export const TextEditor = ({
  sectionId,
  existingContent,
  onContentChange,
}: TextEditorProps) => {
  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="code">Code View</TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor">
        <div className="space-y-4">
          <RichTextEditor
            content={existingContent || ""}
            onChange={(content) => onContentChange(sectionId, content)}
          />
          <QuickFormatButtons 
            sectionId={sectionId}
            existingContent={existingContent}
            onContentChange={onContentChange}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="code">
        <div className="space-y-4">
          <textarea
            value={existingContent || ""}
            onChange={(e) => onContentChange(sectionId, e.target.value)}
            className="w-full h-[400px] font-mono text-sm p-4 border rounded-md"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};