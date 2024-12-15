import { Toggle } from "@/components/ui/toggle";
import { Editor } from '@tiptap/react';
import { Table, Code, FileCode, Palette, ImageIcon } from 'lucide-react';

interface InsertControlsProps {
  editor: Editor;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const InsertControls = ({ editor, onImageUpload }: InsertControlsProps) => {
  if (!editor) return null;

  const handleInsertTable = () => {
    editor.chain().focus().insertTable?.({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertHTMLCode = () => {
    editor.chain().focus().setCodeBlock({ language: 'html' }).insertContent('<div>\n  <!-- Your HTML here -->\n</div>').run();
  };

  const insertCSSCode = () => {
    editor.chain().focus().setCodeBlock({ language: 'css' }).insertContent('.your-class {\n  /* Your CSS here */\n}').run();
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

      <Toggle
        size="sm"
        pressed={editor.isActive('codeBlock', { language: 'html' })}
        onPressedChange={insertHTMLCode}
      >
        <FileCode className="h-4 w-4" />
        <span className="ml-1 text-xs">HTML</span>
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('codeBlock', { language: 'css' })}
        onPressedChange={insertCSSCode}
      >
        <Palette className="h-4 w-4" />
        <span className="ml-1 text-xs">CSS</span>
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