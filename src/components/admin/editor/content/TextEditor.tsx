import { RichTextEditor } from "../../RichTextEditor";
import { Toggle } from "@/components/ui/toggle";
import { Code, Text } from "lucide-react";
import { useState } from "react";
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
  const [isCodeView, setIsCodeView] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2 mb-2">
        <Toggle
          aria-label="Toggle text view"
          pressed={!isCodeView}
          onPressedChange={(pressed) => setIsCodeView(!pressed)}
          className={`gap-2 transition-colors ${
            !isCodeView 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : "hover:bg-green-100"
          }`}
        >
          <Text className="h-4 w-4" />
          Rich Text Editor
        </Toggle>
        
        <Toggle
          aria-label="Toggle code view"
          pressed={isCodeView}
          onPressedChange={setIsCodeView}
          className={`gap-2 transition-colors ${
            isCodeView 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "hover:bg-red-100"
          }`}
        >
          <Code className="h-4 w-4" />
          Code Editor
        </Toggle>
      </div>

      {isCodeView ? (
        <div className="space-y-4">
          <CodeEditor
            editor={null}
            onContentChange={(content) => onContentChange(sectionId, content)}
          />
        </div>
      ) : (
        <>
          <RichTextEditor
            content={existingContent || ""}
            onChange={(content) => onContentChange(sectionId, content)}
          />
          <QuickFormatButtons 
            sectionId={sectionId}
            existingContent={existingContent}
            onContentChange={onContentChange}
          />
        </>
      )}
    </div>
  );
};