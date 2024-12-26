import { Program } from "@/types/programs";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          <img
            src={program.image_url}
            alt={program.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{program.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {program.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};