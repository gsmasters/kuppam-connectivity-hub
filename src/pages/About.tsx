import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface SectionContentResponse {
  content: {
    content: string;
  };
  page_sections: {
    page: string;
    section: string;
  };
}

const About = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('section_content')
        .select(`
          content,
          page_sections!inner (
            page,
            section
          )
        `)
        .eq('is_published', true)
        .eq('page_sections.page', 'about')
        .eq('page_sections.section', 'main')
        .order('version', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return (data as SectionContentResponse)?.content?.content || '';
    },
    staleTime: 1000, // Refetch after 1 second
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