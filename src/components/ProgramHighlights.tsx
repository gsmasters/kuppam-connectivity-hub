import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types/programs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export const ProgramHighlights = () => {
  const { data: programs, isLoading } = useQuery({
    queryKey: ["featured-programs"],
    queryFn: async () => {
      console.log("Fetching featured programs...");
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_active", true)
        .limit(3);

      if (error) {
        console.error("Error fetching programs:", error);
        throw error;
      }

      console.log("Programs fetched:", data);
      return data as Program[];
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!programs?.length) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const firstImage = program.image_url.split(',')[0].trim();
            
            return (
              <Link key={program.id} to={`/programs`}>
                <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="h-48 relative">
                      <img
                        src={firstImage}
                        alt={program.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          console.error("Error loading image:", firstImage);
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-1">{program.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{program.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};