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
    title: "Welcome to MPDO Office",
    description: "Your gateway to rural development and community services in Kuppam Mandal",
    icon: Building,
    color: "text-primary"
  },
  {
    title: "Empowering Communities",
    description: "Dedicated to improving lives through sustainable development initiatives",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Development Programs",
    description: "Implementing innovative schemes for rural growth and welfare",
    icon: FileText,
    color: "text-accent"
  },
  {
    title: "Our Vision",
    description: "Building a stronger, more prosperous future for Kuppam Mandal",
    icon: Target,
    color: "text-primary"
  }
];

export const Hero = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12">
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
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
                  <CardContent className="p-8 sm:p-12">
                    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                      <div className={`p-4 sm:p-6 rounded-full bg-gray-100 ${item.color}`}>
                        <item.icon className="h-10 w-10 sm:h-14 sm:w-14" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
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