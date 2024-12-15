import { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EditorToolbar } from './editor/EditorToolbar';
import { EditorContentWrapper } from './editor/EditorContent';
import { CodeEditor } from './editor/code-view/CodeEditor';
import { createEditorConfig } from './editor/EditorConfig';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [isCodeView, setIsCodeView] = useState(false);
  
  const editor = useEditor(createEditorConfig(content, onChange));

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

      editor?.chain().focus().setImage({ src: publicUrl }).run();
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <EditorToolbar 
        editor={editor} 
        onImageUpload={handleImageUpload} 
        isCodeView={isCodeView}
        onViewChange={setIsCodeView}
      />
      {isCodeView ? (
        <CodeEditor 
          editor={editor}
          onContentChange={onChange}
        />
      ) : (
        <EditorContentWrapper editor={editor} />
      )}
    </div>
  );
};