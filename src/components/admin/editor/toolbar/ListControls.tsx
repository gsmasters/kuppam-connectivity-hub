import { Toggle } from "@/components/ui/toggle";
import { Editor } from '@tiptap/react';
import { List, ListOrdered, Quote } from 'lucide-react';

interface ListControlsProps {
  editor: Editor;
}

export const ListControls = ({ editor }: ListControlsProps) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
    </div>
  );
};