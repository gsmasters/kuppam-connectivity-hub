import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const images = [
  {
    src: "/lovable-uploads/26144d40-5204-4184-ae65-9e062c8991f8.png",
    alt: "MPDO Office Meeting",
    caption: "Digital Governance Initiative Meeting"
  },
  {
    src: "/lovable-uploads/57f2b1fb-c86c-4452-9a64-3b33aa4298cc.png",
    alt: "Training Session",
    caption: "Staff Training Program"
  },
  {
    src: "/lovable-uploads/c8094c4f-8fce-4051-bb7b-f3d38178c754.png",
    alt: "Virtual Interactive Area",
    caption: "Digital Learning Center"
  },
  {
    src: "/lovable-uploads/fbeccff5-817a-4886-af1f-1637586e1a79.png",
    alt: "Community Meeting",
    caption: "Public Engagement Session"
  }
];

export const ProgramGallery = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Card className="p-4 mb-8">
      <h2 className="text-2xl font-bold mb-4">Program Highlights</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-5xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg backdrop-blur-sm">
                  <p className="text-sm sm:text-base">{image.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </Card>
  );
};