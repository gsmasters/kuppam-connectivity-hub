import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgramsShowcase } from "@/components/programs/ProgramsShowcase";
import { ProgramGallery } from "@/components/programs/ProgramGallery";

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Programs</h1>
        <ProgramGallery />
        <ProgramsShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Programs;