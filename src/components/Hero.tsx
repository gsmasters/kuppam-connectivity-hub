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
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-[400px] object-cover rounded-t-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-white/90 mb-1">{event.date}</p>
                        <p className="text-white/80">{event.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};