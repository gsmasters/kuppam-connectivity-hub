import { Program } from "@/types/programs";
import { ProgramCard } from "./ProgramCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramsGridProps {
  programs: Program[];
  isLoading: boolean;
}

export const ProgramsGrid = ({ programs, isLoading }: ProgramsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card key={index}>
            <CardContent className="p-0">
              <Skeleton className="h-48 rounded-t-lg" />
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!programs?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No programs available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};