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
  const { data: aboutContent, isLoading, error } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      console.log('Fetching about page content...');
      
      // First, get the page section ID for the about page's main content
      const { data: pageSections, error: sectionError } = await supabase
        .from('page_sections')
        .select('id')
        .eq('page', 'about')
        .eq('section', 'main');

      if (sectionError) {
        console.error('Error fetching page section:', sectionError);
        throw sectionError;
      }

      if (!pageSections || pageSections.length === 0) {
        console.log('No page section found for about page');
        return ''; // Return empty content if no section exists
      }

      const sectionId = pageSections[0].id;

      // Then get the latest published content for this section
      const { data: contentData, error: contentError } = await supabase
        .from('section_content')
        .select(`
          content
        `)
        .eq('section_id', sectionId)
        .eq('is_published', true)
        .order('version', { ascending: false })
        .limit(1)
        .single();

      if (contentError) {
        if (contentError.code === 'PGRST116') {
          console.log('No published content found for about page');
          return ''; // Return empty content if no published content exists
        }
        console.error('Error fetching section content:', contentError);
        throw contentError;
      }

      console.log('Content fetched successfully:', contentData);
      return contentData?.content || '';
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    retry: 1,
  });

  if (error) {
    console.error('Error in about page query:', error);
  }

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
        ) : error ? (
          <div className="text-red-500">
            Failed to load content. Please try again later.
          </div>
        ) : !aboutContent ? (
          <div className="text-gray-500 italic">
            No content available yet.
          </div>
        ) : (
          <div className="prose max-w-none">
            {aboutContent.split('\n').map((paragraph, index) => (
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