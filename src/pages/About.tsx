import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadershipBanner } from "@/components/LeadershipBanner";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col pt-[4.5rem]">
      <LeadershipBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to the MPDO Office, where we strive to serve the community of Kuppam Mandal. Our mission is to provide efficient and effective governance, ensuring the welfare and development of our citizens.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Our office is dedicated to addressing the needs of the community through various programs and initiatives. We believe in transparency, accountability, and active participation from the public.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          We invite you to explore our website to learn more about our services, programs, and how you can get involved in making a difference in our community.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;