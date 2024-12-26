import { Program } from "@/types/programs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Split the image URLs if they exist, otherwise use a single image
  const images = program.image_url.includes(',') 
    ? program.image_url.split(',').map(url => url.trim())
    : [program.image_url];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  console.log("Rendering program:", program);
  
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <img
                src={images[0]}
                alt={program.title}
                className="w-full h-full object-cover"
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
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">{program.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${program.title} - Image ${currentImageIndex + 1}`}
                className="w-full rounded-lg object-cover max-h-[500px]"
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
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${program.title} thumbnail ${index + 1}`}
                    className={`w-full aspect-video object-cover rounded cursor-pointer 
                      ${currentImageIndex === index ? 'ring-2 ring-primary' : 'opacity-70'}`}
                    onClick={() => setCurrentImageIndex(index)}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                ))}
              </div>
            )}
            
            <p className="text-base leading-relaxed">
              {program.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};