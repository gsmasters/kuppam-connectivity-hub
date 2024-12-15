import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CodeViewToolbarProps {
  codeType: 'html' | 'css';
  onCodeTypeChange: (type: 'html' | 'css') => void;
  getCodeContent: () => string;
}

export const CodeViewToolbar = ({
  codeType,
  onCodeTypeChange,
  getCodeContent
}: CodeViewToolbarProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCodeContent());
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-[#1A1F2C] text-white">
      <div className="flex gap-2">
        <Button
          variant={codeType === 'html' ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onCodeTypeChange('html')}
          className={codeType === 'html' ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""}
        >
          HTML
        </Button>
        <Button
          variant={codeType === 'css' ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onCodeTypeChange('css')}
          className={codeType === 'css' ? "bg-[#D946EF] hover:bg-[#D946EF]/90" : ""}
        >
          CSS
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4" />
        Copy {codeType.toUpperCase()}
      </Button>
    </div>
  );
};