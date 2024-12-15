import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StaffContactList } from "@/components/departments/StaffContactList";

const Departments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <StaffContactList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Departments;