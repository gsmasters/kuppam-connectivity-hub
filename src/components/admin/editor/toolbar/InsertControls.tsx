import { Toggle } from "@/components/ui/toggle";
import { Editor } from '@tiptap/react';
import { Table, Code, ImageIcon } from 'lucide-react';

interface InsertControlsProps {
  editor: Editor;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const InsertControls = ({ editor, onImageUpload }: InsertControlsProps) => {
  if (!editor) return null;

  const handleInsertTable = () => {
    editor.chain().focus().insertTable?.({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="flex items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('table')}
        onPressedChange={handleInsertTable}
      >
        <Table className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>

      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
        <div className="p-2 hover:bg-accent rounded-sm">
          <ImageIcon className="h-4 w-4" />
        </div>
      </label>
    </div>
  );
};