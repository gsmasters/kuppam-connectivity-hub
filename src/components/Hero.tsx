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
import { Building, Users, FileText, Target } from "lucide-react";

const highlights = [
  {
    title: "About MPDO Office",
    description: "Dedicated to rural development and community welfare in Kuppam Mandal",
    icon: Building,
    color: "text-primary"
  },
  {
    title: "Community Services",
    description: "Providing essential services and support to rural communities",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Development Programs",
    description: "Implementing various schemes for rural development and welfare",
    icon: FileText,
    color: "text-accent"
  },
  {
    title: "Our Mission",
    description: "Empowering rural communities through sustainable development initiatives",
    icon: Target,
    color: "text-primary"
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
            {highlights.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-full bg-gray-100 ${item.color}`}>
                        <item.icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-lg max-w-2xl">
                        {item.description}
                      </p>
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