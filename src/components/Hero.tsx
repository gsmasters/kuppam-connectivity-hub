import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#1a4894] to-[#0f2d5e] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in leading-tight">
            Welcome to MPDO Office Kuppam Mandal
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in max-w-2xl mx-auto">
            Serving the community with dedication and transparency. Access government services, programs, and information.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button
              variant="secondary"
              className="bg-white text-[#1a4894] hover:bg-gray-100 font-semibold"
            >
              View Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};