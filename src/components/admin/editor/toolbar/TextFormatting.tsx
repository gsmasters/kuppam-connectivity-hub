import { Toggle } from "@/components/ui/toggle";
import { Editor } from '@tiptap/react';
import { Bold, Italic, Strikethrough } from 'lucide-react';

interface TextFormattingProps {
  editor: Editor;
}

export const TextFormatting = ({ editor }: TextFormattingProps) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
    </div>
  );
};