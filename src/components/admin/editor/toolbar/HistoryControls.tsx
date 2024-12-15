import { Toggle } from "@/components/ui/toggle";
import { Editor } from '@tiptap/react';
import { Undo, Redo } from 'lucide-react';

interface HistoryControlsProps {
  editor: Editor;
}

export const HistoryControls = ({ editor }: HistoryControlsProps) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1">
      <Toggle
        size="sm"
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </div>
  );
};