import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('is_published', true)
        .inner join('page_sections', { 
          foreignTable: 'page_sections',
          conditions: [
            { column: 'section_content.section_id', equals: { foreignColumn: 'id' } },
            { column: 'page_sections.page', equals: 'about' },
            { column: 'page_sections.section', equals: 'main' }
          ]
        })
        .single();

      if (error) throw error;
      return data?.content?.content || '';
    }
  });

  return (
    <div className="min-h-screen flex flex-col pt-[4.5rem]">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="prose max-w-none">
            {aboutContent?.split('\n').map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mt-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;