import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { DepartmentsList } from "@/components/departments/DepartmentsList";
import { RepresentativesList } from "@/components/departments/RepresentativesList";

const Departments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <DepartmentsList />
          <RepresentativesList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Departments;