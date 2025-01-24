import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { PopulationStats } from "@/components/PopulationStats";
import { NotificationTicker } from "@/components/NotificationTicker";
import { ProgramHighlights } from "@/components/ProgramHighlights";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kuppam Connectivity Hub - MPDO Office Official Website</title>
        <meta name="description" content="Official website of MPDO Office Kuppam. Access government services, programs, and stay updated with latest announcements from Mandal Development Office." />
        <meta name="keywords" content="MPDO Kuppam, Mandal Development Office, Government Services, Kuppam Programs, Rural Development" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kuppam-mpdo.gov.in/" />
        <meta property="og:title" content="Kuppam Connectivity Hub - MPDO Office Official Website" />
        <meta property="og:description" content="Official website of MPDO Office Kuppam. Access government services, programs, and stay updated with latest announcements from Mandal Development Office." />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kuppam-mpdo.gov.in/" />
        <meta property="twitter:title" content="Kuppam Connectivity Hub - MPDO Office Official Website" />
        <meta property="twitter:description" content="Official website of MPDO Office Kuppam. Access government services, programs, and stay updated with latest announcements from Mandal Development Office." />
        <meta property="twitter:image" content="/og-image.png" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="MPDO Office Kuppam" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://kuppam-mpdo.gov.in/" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              "name": "MPDO Office Kuppam",
              "alternateName": "Mandal Development Office Kuppam",
              "url": "https://kuppam-mpdo.gov.in",
              "logo": "https://kuppam-mpdo.gov.in/og-image.png",
              "description": "Official website of MPDO Office Kuppam. Access government services, programs, and stay updated with latest announcements from Mandal Development Office.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kuppam",
                "addressRegion": "Andhra Pradesh",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "94910 71391",
                "email": "kuppam.brgf@gmail.com"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col" itemScope itemType="https://schema.org/WebPage">
        <NotificationTicker />
        <LeadershipBanner />
        <Header />
        <main className="flex-grow">
          <Hero />
          <ProgramHighlights />
          <PopulationStats />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;