import { Editor } from '@tiptap/react';
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { TextFormatting } from './toolbar/TextFormatting';
import { HeadingSelect } from './toolbar/HeadingSelect';
import { AlignmentControls } from './toolbar/AlignmentControls';
import { ListControls } from './toolbar/ListControls';
import { InsertControls } from './toolbar/InsertControls';
import { HistoryControls } from './toolbar/HistoryControls';
import { Code, Text } from "lucide-react";

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isCodeView: boolean;
  onViewChange: (isCode: boolean) => void;
}

export const EditorToolbar = ({ editor, onImageUpload, isCodeView, onViewChange }: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Toggle
          aria-label="Toggle text view"
          pressed={!isCodeView}
          onPressedChange={(pressed) => onViewChange(!pressed)}
          className={`gap-2 transition-colors ${
            !isCodeView 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : "hover:bg-green-100"
          }`}
        >
          <Text className="h-4 w-4" />
          Text View
        </Toggle>
        
        <Toggle
          aria-label="Toggle code view"
          pressed={isCodeView}
          onPressedChange={(pressed) => onViewChange(pressed)}
          className={`gap-2 transition-colors ${
            isCodeView 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "hover:bg-red-100"
          }`}
        >
          <Code className="h-4 w-4" />
          Code View
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-8" />
      
      {!isCodeView && (
        <>
          <TextFormatting editor={editor} />
          
          <Separator orientation="vertical" className="h-8" />
          
          <HeadingSelect editor={editor} />
          
          <Separator orientation="vertical" className="h-8" />
          
          <AlignmentControls editor={editor} />
          
          <Separator orientation="vertical" className="h-8" />
          
          <ListControls editor={editor} />
          
          <Separator orientation="vertical" className="h-8" />
          
          <InsertControls editor={editor} onImageUpload={onImageUpload} />
          
          <Separator orientation="vertical" className="h-8" />
          
          <HistoryControls editor={editor} />
        </>
      )}
    </div>
  );
};