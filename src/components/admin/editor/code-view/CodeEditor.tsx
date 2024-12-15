import { useState, useEffect } from "react";

interface CodeEditorProps {
  editor: any;
  onContentChange: (content: string) => void;
}

export const CodeEditor = ({ editor, onContentChange }: CodeEditorProps) => {
  const [cssContent, setCssContent] = useState('');

  useEffect(() => {
    // Extract CSS when component mounts or HTML content changes
    if (editor) {
      setCssContent(extractCSS(editor.getHTML()));
    }
  }, [editor]);

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

  const handleCSSChange = (newCSS: string) => {
    setCssContent(newCSS);
    const html = editor?.getHTML() || '';
    const styleTagRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
    const updatedHtml = html.replace(styleTagRegex, '') + `\n<style>\n${newCSS}\n</style>`;
    editor?.commands.setContent(updatedHtml);
    onContentChange(updatedHtml);
  };

  return (
    <div className="border-t">
      <textarea
        value={cssContent}
        onChange={(e) => handleCSSChange(e.target.value)}
        className="w-full h-[400px] font-mono text-sm p-4 bg-background"
        placeholder="/* Add your CSS styles here */"
      />
    </div>
  );
};