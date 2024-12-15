import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EditorToolbar } from './editor/EditorToolbar';
import { EditorContentWrapper } from './editor/EditorContent';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [isCodeView, setIsCodeView] = useState(false);
  const [codeType, setCodeType] = useState<'html' | 'css'>('html');
  const [cssContent, setCssContent] = useState('');
  const lowlight = createLowlight(common)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-md bg-muted p-4 my-4',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

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

  const extractCSS = (html: string): string => {
    const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const inlineStyleRegex = /style="([^"]*)"/gi;
    
    let css = '';
    
    const styleTagMatches = [...html.matchAll(styleTagRegex)];
    if (styleTagMatches.length > 0) {
      css += styleTagMatches.map(match => match[1]).join('\n\n');
    }
    
    const inlineStyles = [...html.matchAll(inlineStyleRegex)];
    if (inlineStyles.length > 0) {
      if (css) css += '\n\n/* Inline Styles */\n';
      css += inlineStyles.map((match, index) => {
        const styles = match[1];
        return `.element-${index + 1} {\n  ${styles.split(';').join(';\n  ')}\n}`;
      }).join('\n\n');
    }
    
    return css || '/* No CSS styles found */';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleCSSChange = (newCSS: string) => {
    setCssContent(newCSS);
    // Update the HTML content with the new CSS
    const html = editor?.getHTML() || '';
    const styleTagRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
    const updatedHtml = html.replace(styleTagRegex, '') + `\n<style>\n${newCSS}\n</style>`;
    editor?.commands.setContent(updatedHtml);
    onChange(updatedHtml);
  };

  if (!editor) {
    return null;
  }

  const getCodeContent = () => {
    const html = editor.getHTML();
    return codeType === 'html' ? html : extractCSS(html);
  };

  return (
    <div className="border rounded-lg">
      <EditorToolbar 
        editor={editor} 
        onImageUpload={handleImageUpload} 
        isCodeView={isCodeView}
        onViewChange={setIsCodeView}
      />
      {isCodeView ? (
        <div className="border-t">
          <div className="flex items-center justify-between p-2 bg-muted">
            <div className="flex gap-2">
              <Button
                variant={codeType === 'html' ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCodeType('html')}
              >
                HTML
              </Button>
              <Button
                variant={codeType === 'css' ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCodeType('css')}
              >
                CSS
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => copyToClipboard(getCodeContent())}
            >
              <Copy className="h-4 w-4" />
              Copy {codeType.toUpperCase()}
            </Button>
          </div>
          <textarea
            value={codeType === 'html' ? editor.getHTML() : cssContent || extractCSS(editor.getHTML())}
            onChange={(e) => {
              if (codeType === 'html') {
                editor.commands.setContent(e.target.value);
                onChange(e.target.value);
              } else {
                handleCSSChange(e.target.value);
              }
            }}
            className="w-full h-[400px] font-mono text-sm p-4"
            placeholder={codeType === 'css' ? '/* CSS styles will appear here */' : '<!-- HTML content -->'}
          />
        </div>
      ) : (
        <EditorContentWrapper editor={editor} />
      )}
    </div>
  );
};