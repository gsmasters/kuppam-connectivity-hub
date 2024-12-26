interface ExistingImagesGridProps {
  images: string[];
  title: string;
}

export const ExistingImagesGrid = ({ images, title }: ExistingImagesGridProps) => {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
  );
};