import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const events = [
  {
    title: "Gram Sabha Meeting",
    date: "March 15, 2024",
    image: "/lovable-uploads/c8094c4f-8fce-4051-bb7b-f3d38178c754.png",
    description: "Discussion on village development plans and initiatives"
  },
  {
    title: "Rural Development Workshop",
    date: "March 10, 2024",
    image: "/lovable-uploads/57f2b1fb-c86c-4452-9a64-3b33aa4298cc.png",
    description: "Training session on new agricultural techniques"
  },
  {
    title: "Community Health Camp",
    date: "March 5, 2024",
    image: "/lovable-uploads/a42ee3a8-1935-49b6-a93a-0c381891b668.png",
    description: "Free health checkup and awareness program"
  },
  {
    title: "Youth Skill Development",
    date: "March 1, 2024",
    image: "/lovable-uploads/bba7b4cc-8d6d-4f4c-a623-c76ac3eb28bc.png",
    description: "Career guidance and skill training workshop"
  }
];

export const Hero = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 backdrop-blur-sm bg-gradient-to-b from-[#1A1F2C]/95 to-[#2C2A3C]/95">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={index}>
                <Card className="border-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-[600px] object-cover transform transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px]">
                        <div className="absolute bottom-0 left-0 right-0 p-10">
                          <p className="text-white/70 mb-2 font-light tracking-wider animate-fade-in">{event.date}</p>
                          <h3 className="text-4xl font-bold text-white mb-4 tracking-tight animate-fade-in">
                            {event.title}
                          </h3>
                          <p className="text-white/80 text-xl max-w-2xl leading-relaxed animate-fade-in">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-none text-white" />
          <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-none text-white" />
        </Carousel>
      </div>
    </section>
  );
};