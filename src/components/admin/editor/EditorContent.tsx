import { Editor, EditorContent } from '@tiptap/react';

interface EditorContentProps {
  editor: Editor;
}

export const EditorContentWrapper = ({ editor }: EditorContentProps) => {
  return (
    <EditorContent editor={editor} className="prose max-w-none p-4" />
  );
};