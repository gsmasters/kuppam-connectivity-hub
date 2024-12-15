import { Editor } from '@tiptap/react';
import { Separator } from "@/components/ui/separator";
import { TextFormatting } from './toolbar/TextFormatting';
import { HeadingSelect } from './toolbar/HeadingSelect';
import { AlignmentControls } from './toolbar/AlignmentControls';
import { ListControls } from './toolbar/ListControls';
import { InsertControls } from './toolbar/InsertControls';
import { HistoryControls } from './toolbar/HistoryControls';

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const EditorToolbar = ({ editor, onImageUpload }: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
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
    </div>
  );
};