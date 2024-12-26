import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgramsShowcase } from "@/components/programs/ProgramsShowcase";

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Our Programs</h1>
          <ProgramsShowcase />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;