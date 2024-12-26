import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { PopulationStats } from "@/components/PopulationStats";
import { PageHighlights } from "@/components/PageHighlights";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <div>
        <Header />
        <main className="flex-grow">
          <Hero />
          <PageHighlights />
          <PopulationStats />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;