import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface SectionContent {
  content: string;
  version: number;
}

const About = () => {
  const { toast } = useToast();
  const { data: aboutContent, isLoading, error, refetch } = useQuery({
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
        // If no section exists, create one
        const { data: newSection, error: createError } = await supabase
          .from('page_sections')
          .insert({
            page: 'about',
            section: 'main',
            title: 'About Us',
            content_type: 'text'
          })
          .select()
          .single();

        if (createError) throw createError;
        
        // Create initial content
        const { error: contentError } = await supabase
          .from('section_content')
          .insert({
            section_id: newSection.id,
            content: 'Welcome to our About page. This content can be edited from the admin dashboard.',
            version: 1,
            is_published: true,
            is_draft: false
          });

        if (contentError) throw contentError;
        
        return 'Welcome to our About page. This content can be edited from the admin dashboard.';
      }

      const sectionId = pageSections[0].id;

      // Then get the latest published content for this section
      const { data: contentData, error: contentError } = await supabase
        .from('section_content')
        .select('*')
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
      return contentData.content;
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    retry: 1,
  });

  useEffect(() => {
    // Set up real-time subscription for content updates
    const channel = supabase
      .channel('about-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'section_content'
        },
        (payload) => {
          console.log('Content update received:', payload);
          refetch();
          toast({
            title: "Content Updated",
            description: "The page content has been updated.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch, toast]);

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
            {typeof aboutContent === 'string' && aboutContent.split('\n').map((paragraph, index) => (
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