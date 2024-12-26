import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { Link } from "react-router-dom";

export const Hero = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

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

  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {programs.map((program, index) => {
              const firstImage = program.image_url.split(',')[0].trim();
              
              return (
                <CarouselItem key={program.id}>
                  <Link to="/programs" className="block relative">
                    <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
                      <img
                        src={firstImage}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          console.error("Error loading image:", firstImage);
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                          {program.title}
                        </h2>
                        <p className="text-lg sm:text-xl opacity-90 line-clamp-2">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4" />
          <CarouselNext className="hidden sm:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};