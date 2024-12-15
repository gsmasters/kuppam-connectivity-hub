import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Editor } from '@tiptap/react';
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Quote, Table, Link as LinkIcon, Image as ImageIcon,
  Code, FileCode, Palette, Undo, Redo
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const EditorToolbar = ({ editor, onImageUpload }: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  const handleHeadingChange = (value: string) => {
    if (value === 'p') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace('h', ''));
      editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }
  };

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
    <div className="border-b p-2 flex flex-wrap gap-2">
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

      <Separator orientation="vertical" className="h-8" />

      <Select
        value={editor.isActive('heading') ? `h${editor.getAttributes('heading').level}` : 'p'}
        onValueChange={handleHeadingChange}
      >
        <SelectTrigger className="w-[120px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="p">Paragraph</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'justify' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-8" />

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

      <Separator orientation="vertical" className="h-8" />

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

      <Separator orientation="vertical" className="h-8" />

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
    </div>
  );
};