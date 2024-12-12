import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-primary to-primary/90 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          Welcome to MPDO Office Kuppam Mandal
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
          Serving the community with dedication and transparency
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
          <Button
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
          >
            View Services
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};