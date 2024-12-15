import { useState } from "react";
import { CodeViewToolbar } from "./CodeViewToolbar";

interface CodeEditorProps {
  editor: any;
  onContentChange: (content: string) => void;
}

export const CodeEditor = ({ editor, onContentChange }: CodeEditorProps) => {
  const [codeType, setCodeType] = useState<'html' | 'css'>('html');
  const [cssContent, setCssContent] = useState('');

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

  const getCodeContent = () => {
    const html = editor?.getHTML() || '';
    return codeType === 'html' ? html : extractCSS(html);
  };

  return (
    <div className="border-t">
      <CodeViewToolbar
        codeType={codeType}
        onCodeTypeChange={setCodeType}
        getCodeContent={getCodeContent}
      />
      <textarea
        value={codeType === 'html' ? editor.getHTML() : cssContent || extractCSS(editor.getHTML())}
        onChange={(e) => {
          if (codeType === 'html') {
            editor.commands.setContent(e.target.value);
            onContentChange(e.target.value);
          } else {
            handleCSSChange(e.target.value);
          }
        }}
        className="w-full h-[400px] font-mono text-sm p-4"
        placeholder={codeType === 'css' ? '/* CSS styles will appear here */' : '<!-- HTML content -->'}
      />
    </div>
  );
};