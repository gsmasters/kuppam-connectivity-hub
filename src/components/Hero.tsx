import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [randomizedPrograms, setRandomizedPrograms] = useState<Program[]>([]);

  const { data: programs } = useQuery({
    queryKey: ["featured-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching programs:", error);
        return [];
      }

      return data as Program[];
    },
  });

  useEffect(() => {
    if (programs && programs.length > 0) {
      const usedImages = new Set<string>();
      
      const programsWithRandomImages = programs.map(program => {
        const images = program.image_url.split(',').map(url => url.trim());
        const availableImages = images.filter(img => !usedImages.has(img));
        
        if (availableImages.length === 0) {
          usedImages.clear();
          availableImages.push(...images);
        }
        
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages[randomIndex];
        
        usedImages.add(selectedImage);
        
        return {
          ...program,
          randomImage: selectedImage
        };
      });
      
      setRandomizedPrograms(programsWithRandomImages);
    }
  }, [programs]);

  if (!randomizedPrograms || randomizedPrograms.length === 0) {
    return null;
  }

  return (
    <section 
      className="bg-gradient-to-b from-white to-gray-50 py-4 sm:py-8"
      aria-label="Featured Programs Carousel"
    >
      <div className="container mx-auto px-2 sm:px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          aria-label="Programs showcase carousel"
        >
          <CarouselContent>
            {randomizedPrograms.map((program, index) => (
              <CarouselItem key={program.id}>
                <Link 
                  to="/programs" 
                  className="block"
                  aria-label={`View details for ${program.title}`}
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-lg sm:rounded-xl overflow-hidden border-4 sm:border-8 border-white shadow-lg sm:shadow-2xl mx-2 sm:mx-4"
                    role="article"
                  >
                    <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative group">
                      <div 
                        className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" 
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 p-1 sm:p-2">
                        <img
                          src={program.randomImage}
                          alt={`Featured image for ${program.title}`}
                          className="w-full h-full object-cover rounded-md sm:rounded-lg transition-transform duration-700 group-hover:scale-105"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            console.error("Error loading image:", program.randomImage);
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div 
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-8"
                        role="contentinfo"
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                            {program.title}
                          </h2>
                          <p className="text-sm sm:text-lg md:text-xl text-white/90 line-clamp-2 drop-shadow-lg">
                            {program.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="hidden sm:flex -left-4" 
            aria-label="Previous slide"
          />
          <CarouselNext 
            className="hidden sm:flex -right-4" 
            aria-label="Next slide"
          />
        </Carousel>
      </div>
    </section>
  );
};