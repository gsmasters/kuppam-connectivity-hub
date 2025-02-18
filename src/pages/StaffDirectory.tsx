import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";
import { StaffContactList } from "@/components/departments/StaffContactList";

const StaffDirectory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <StaffContactList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffDirectory;