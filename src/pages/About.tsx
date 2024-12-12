import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">About MPDO Office</h1>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Mandal Parishad Development Officer (MPDO)</h2>
          <p className="text-gray-600 mb-4">
            A Mandal Parishad Development Officer (MPDO), also known as a block development officer (BDO), 
            is responsible for managing gram panchayats and various development activities in the mandal.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Key Responsibilities:</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Managing 29 gram panchayats in KUPPAM mandal</li>
            <li>Quarterly inspection of gram panchayats</li>
            <li>Reconciliation of gram panchayat accounts</li>
            <li>Monitoring village activities (sanitation, water supply, street lights)</li>
            <li>Implementation of MGNREGS program</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;