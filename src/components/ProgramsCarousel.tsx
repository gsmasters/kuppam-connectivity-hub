import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const programs = [
  {
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    title: "Digital Literacy Program",
    date: "March 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    title: "Women Empowerment Workshop",
    date: "February 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Rural Development Meeting",
    date: "January 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    title: "Technology Training",
    date: "December 2023",
  },
];

export const ProgramsCarousel = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Programs</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {programs.map((program, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{program.title}</h3>
                    <p className="text-sm text-gray-600">{program.date}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};