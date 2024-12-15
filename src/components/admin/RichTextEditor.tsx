import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EditorToolbar } from './editor/EditorToolbar';
import { EditorContentWrapper } from './editor/EditorContent';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { data, error } = await supabase.storage
        .from('content-images')
        .upload(`editor/${Date.now()}-${file.name}`, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('content-images')
        .getPublicUrl(data.path);

      editor.chain().focus().setImage({ src: publicUrl }).run();
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="border rounded-lg">
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContentWrapper editor={editor} />
    </div>
  );
};