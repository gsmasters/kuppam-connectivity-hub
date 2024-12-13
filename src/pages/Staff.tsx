import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { ElectedRepresentatives } from "@/components/departments/ElectedRepresentatives";
import { LeadershipBanner } from "@/components/LeadershipBanner";

const Staff = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LeadershipBanner />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Departments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Elected Representatives</h2>
        <ElectedRepresentatives />
      </main>
      <Footer />
    </div>
  );
};

export default Staff;
