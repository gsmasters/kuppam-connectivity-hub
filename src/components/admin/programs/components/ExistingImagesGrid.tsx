import { ScrollArea } from "@/components/ui/scroll-area";

interface ExistingImagesGridProps {
  images: string[];
  title: string;
}

export const ExistingImagesGrid = ({ images, title }: ExistingImagesGridProps) => {
  if (!images?.length) return null;

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {images.map((url, index) => (
          <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src={url.trim()}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};