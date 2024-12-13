import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuickLinks } from "@/components/QuickLinks";
import { Footer } from "@/components/Footer";
import { NotificationTicker } from "@/components/NotificationTicker";
import { ProgramsCarousel } from "@/components/ProgramsCarousel";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <NotificationTicker />
      <main className="flex-grow">
        <Hero />
        <ProgramsCarousel />
        <QuickLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;