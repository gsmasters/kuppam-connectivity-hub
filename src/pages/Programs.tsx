import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { ProgramsShowcase } from "@/components/programs/ProgramsShowcase";

export default function Programs() {
  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow">
        <div className="container py-8 space-y-8">
          <h1 className="text-3xl font-bold">Programs & Initiatives</h1>
          <ProgramsShowcase />
        </div>
      </main>
      <Footer />
    </div>
  );
}