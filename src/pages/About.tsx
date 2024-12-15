import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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

const defaultContent = `MPDO: Mandal Parishad Development Officer
A Mandal Parishad Development Officer (MPDO), also known as a block development officer (BDO), is responsible for a number of tasks, including:

Managing gram panchayats
An MPDO in KUPPAM mandal manages 29 gram panchayats. 

Inspecting gram panchayats
An MPDO inspects all gram panchayats in their mandal every quarter. This includes physically verifying the properties of the gram panchayat. 

Reconciling accounts
An MPDO reconciles gram panchayat accounts with the local sub-treasury on a regular basis. 

Ensuring regular activities
An MPDO keeps a close watch on the villages in their jurisdiction to maintain regular activities like sanitation, drinking water, street lights etc.

Mgnregs
MPDO is a programming officer for MGREGS a central scheme for 100 days employment generation programme.`;

const About = () => {
  const { toast } = useToast();
  const { data: aboutContent, isLoading, error, refetch } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      console.log('Fetching about page content...');
      
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
        const { data: newSection, error: createError } = await supabase
          .from('page_sections')
          .insert({
            page: 'about',
            section: 'main',
            title: 'About Us',
            content_type: 'text',
            section_type: 'about'
          })
          .select()
          .single();

        if (createError) throw createError;
        
        const { error: contentError } = await supabase
          .from('section_content')
          .insert({
            section_id: newSection.id,
            content: { content: defaultContent },
            version: 1,
            is_published: true,
            is_draft: false
          });

        if (contentError) throw contentError;
        
        return defaultContent;
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
        if (contentError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('section_content')
            .insert({
              section_id: sectionId,
              content: { content: defaultContent },
              version: 1,
              is_published: true,
              is_draft: false
            });

          if (insertError) throw insertError;
          return defaultContent;
        }
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