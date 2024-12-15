import { Editor } from '@tiptap/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeadingSelectProps {
  editor: Editor;
}

export const HeadingSelect = ({ editor }: HeadingSelectProps) => {
  if (!editor) return null;

  const handleHeadingChange = (value: string) => {
    if (value === 'p') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace('h', '')) as 1 | 2 | 3 | 4 | 5 | 6;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
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
  );
};