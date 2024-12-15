import { ImageUploader } from "../ImageUploader";

interface ImageEditorProps {
  sectionId: string;
  layoutWidth: number | null;
  layoutHeight: number | null;
  existingContent: any;
  onContentChange: (sectionId: string, content: any) => void;
}

export const ImageEditor = ({
  sectionId,
  layoutWidth,
  layoutHeight,
  existingContent,
  onContentChange,
}: ImageEditorProps) => {
  return (
    <ImageUploader
      sectionId={sectionId}
      layoutWidth={layoutWidth}
      layoutHeight={layoutHeight}
      existingContent={existingContent}
      onContentChange={onContentChange}
    />
  );
};