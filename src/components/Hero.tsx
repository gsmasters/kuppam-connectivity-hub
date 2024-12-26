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
      // Create an array of all available images from all programs
      const allImages = programs.flatMap(program => 
        program.image_url.split(',').map(url => ({
          url: url.trim(),
          programId: program.id,
          title: program.title,
          description: program.description
        }))
      );

      // Shuffle the images array
      const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);

      // Create new program objects with randomized images
      const randomized = programs.map((program, index) => ({
        ...program,
        image_url: shuffledImages[index % shuffledImages.length].url
      }));

      setRandomizedPrograms(randomized);
    }
  }, [programs]);

  if (!randomizedPrograms || randomizedPrograms.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {randomizedPrograms.map((program) => (
              <CarouselItem key={program.id}>
                <Link to="/programs" className="block">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-xl overflow-hidden border-8 border-white shadow-2xl mx-4"
                  >
                    <div className="aspect-[21/9] w-full relative group">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <img
                        src={program.image_url}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          console.error("Error loading image:", program.image_url);
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                            {program.title}
                          </h2>
                          <p className="text-lg sm:text-xl text-white/90 line-clamp-2 drop-shadow-lg">
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
          <CarouselPrevious className="hidden sm:flex -left-4" />
          <CarouselNext className="hidden sm:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};