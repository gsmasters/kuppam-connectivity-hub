interface QuickFormatButtonsProps {
  sectionId: string;
  existingContent: string;
  onContentChange: (sectionId: string, content: string) => void;
}

export const QuickFormatButtons = ({
  sectionId,
  existingContent,
  onContentChange,
}: QuickFormatButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-2 border-t">
      <div className="text-sm text-muted-foreground">
        Quick Formatting:
      </div>
      <button
        onClick={() => onContentChange(sectionId, existingContent + "<h2>New Heading</h2>")}
        className="px-2 py-1 text-sm bg-secondary rounded hover:bg-secondary/80"
      >
        Add Heading
      </button>
      <button
        onClick={() => onContentChange(sectionId, existingContent + "<ul><li>New List Item</li></ul>")}
        className="px-2 py-1 text-sm bg-secondary rounded hover:bg-secondary/80"
      >
        Add List
      </button>
      <button
        onClick={() => onContentChange(sectionId, existingContent + "<hr />")}
        className="px-2 py-1 text-sm bg-secondary rounded hover:bg-secondary/80"
      >
        Add Divider
      </button>
    </div>
  );
};