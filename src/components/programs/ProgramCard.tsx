import { Program } from "@/types/programs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const images = program.image_url.includes(',') 
    ? program.image_url.split(',').map(url => url.trim())
    : [program.image_url];

  useEffect(() => {
    if (!isOpen || !isAutoScrolling || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isOpen, isAutoScrolling, images.length]);

  const nextImage = () => {
    setIsAutoScrolling(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setIsAutoScrolling(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isAutoScrolling) {
      const timer = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAutoScrolling]);

  return (
    <>
      <Card 
        className="overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-0">
          <div className="h-[200px] relative">
            <img
              src={images[0]}
              alt={program.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                console.error("Error loading image:", images[0]);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{program.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {program.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">{program.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={images[currentImageIndex]}
                alt={`${program.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-[400px] md:h-[500px] rounded-lg object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      previousImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoScrolling(false);
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-base leading-relaxed">
              {program.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};