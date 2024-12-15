import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState('300');
  const [imageHeight, setImageHeight] = useState('200');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'resize-none',
          width: imageWidth,
          height: imageHeight,
        },
      }),
      TextStyle,
      Color,
      Highlight,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ 
        src: imageUrl,
      }).run();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}
        >
          Bold
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive('italic')}
        >
          Italic
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          data-active={editor.isActive('highlight')}
        >
          Highlight
        </Button>
        <div className="flex gap-2 items-center">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            className="max-w-[200px]"
          />
          <Input
            type="text"
            placeholder="Width (px)"
            value={imageWidth}
            onChange={(e) => setImageWidth(e.target.value)}
            className="w-24"
          />
          <Input
            type="text"
            placeholder="Height (px)"
            value={imageHeight}
            onChange={(e) => setImageHeight(e.target.value)}
            className="w-24"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addImage}
            disabled={!imageUrl}
          >
            Add Image
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} className="min-h-[200px] border rounded-lg p-4" />
    </div>
  );
};