import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { PopulationStats } from "@/components/PopulationStats";
import { NotificationTicker } from "@/components/NotificationTicker";
import { ProgramHighlights } from "@/components/ProgramHighlights";

const Index = () => {
  return (
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
  );
};

export default Index;