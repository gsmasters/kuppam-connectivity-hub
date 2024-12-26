import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortalsContent } from "@/components/portals/PortalsContent";

const GovernmentPortals = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PortalsContent />
      </main>
      <Footer />
    </div>
  );
};

export default GovernmentPortals;