import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DepartmentsList } from "@/components/about/DepartmentsList";

interface SectionContent {
  id: string;
  section_id: string;
  content: {
    content: string;
  };
  version: number;
  is_published: boolean;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
}

const About = () => {
  const { toast } = useToast();
  const { data: aboutContent, isLoading, error, refetch } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      console.log('Fetching about page content...');
      
      const { data: pageSections } = await supabase
        .from('page_sections')
        .select('id')
        .eq('page', 'about-us')
        .eq('section', 'main');

      if (!pageSections || pageSections.length === 0) {
        throw new Error('Section not found');
      }

      const sectionId = pageSections[0].id;

      const { data: contentData, error: contentError } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', sectionId)
        .eq('is_published', true)
        .order('version', { ascending: false })
        .limit(1)
        .single();

      if (contentError) {
        console.error('Error fetching section content:', contentError);
        throw contentError;
      }

      console.log('Content fetched successfully:', contentData);
      const typedContent = contentData as SectionContent;
      return typedContent.content.content;
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  useEffect(() => {
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

  return (
    <div className="container mx-auto px-4 py-8">
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
        <>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          />
          <DepartmentsList />
        </>
      )}
    </div>
  );
};

export default About;