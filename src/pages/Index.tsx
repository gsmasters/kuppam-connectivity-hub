import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { NotificationTicker } from "@/components/NotificationTicker";
import { ProgramsCarousel } from "@/components/ProgramsCarousel";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { PopulationStats } from "@/components/PopulationStats";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col pt-[4.5rem]">
      <LeadershipBanner />
      <Header />
      <NotificationTicker />
      <main className="flex-grow">
        <Hero />
        <ProgramsCarousel />
        <PopulationStats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;