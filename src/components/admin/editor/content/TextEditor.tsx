import { RichTextEditor } from "../../RichTextEditor";
import { QuickFormatButtons } from "./QuickFormatButtons";
import { CodeEditor } from "../code-view/CodeEditor";

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
    <div className="space-y-4">
      <div className="border rounded-lg">
        <RichTextEditor
          content={existingContent || ""}
          onChange={(content) => onContentChange(sectionId, content)}
        />
      </div>
      <div className="border rounded-lg">
        <div className="p-2 bg-muted border-b">
          <h3 className="text-sm font-medium">CSS Styles</h3>
        </div>
        <CodeEditor
          editor={null}
          onContentChange={(content) => onContentChange(sectionId, content)}
        />
      </div>
      <QuickFormatButtons 
        sectionId={sectionId}
        existingContent={existingContent}
        onContentChange={onContentChange}
      />
    </div>
  );
};