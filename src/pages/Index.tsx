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
        <link rel="canonical" href="https://kuppam-mpdo.gov.in/" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
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