import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { NotificationTicker } from "@/components/NotificationTicker";
import { ProgramsCarousel } from "@/components/ProgramsCarousel";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { PopulationStats } from "@/components/PopulationStats";
import { QuickLinks } from "@/components/QuickLinks";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <div className="flex-1">
        <Header />
        <NotificationTicker />
        <main>
          <Hero />
          <QuickLinks />
          <ProgramsCarousel />
          <PopulationStats />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;