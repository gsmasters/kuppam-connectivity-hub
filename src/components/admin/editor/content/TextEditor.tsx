import { RichTextEditor } from "../../RichTextEditor";
import { Toggle } from "@/components/ui/toggle";
import { Code } from "lucide-react";
import { useState } from "react";
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
  const [isCodeView, setIsCodeView] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <Toggle
          aria-label="Toggle code view"
          pressed={isCodeView}
          onPressedChange={setIsCodeView}
          className="gap-2"
        >
          <Code className="h-4 w-4" />
          Code View
        </Toggle>
      </div>

      {isCodeView ? (
        <textarea
          value={existingContent || ""}
          onChange={(e) => onContentChange(sectionId, e.target.value)}
          className="w-full h-[400px] font-mono text-sm p-4 border rounded-md bg-muted"
        />
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