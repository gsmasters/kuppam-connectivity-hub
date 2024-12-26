import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { ProgramHighlights } from "@/components/ProgramHighlights";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <div>
        <Header />
        <main className="flex-grow">
          <Hero />
          <ProgramHighlights />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;