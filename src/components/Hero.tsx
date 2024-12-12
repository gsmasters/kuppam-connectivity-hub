import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in leading-tight text-gray-900">
            Welcome to MPDO Office Kuppam Mandal
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 animate-fade-in max-w-2xl mx-auto">
            Serving the community with dedication and transparency. Access government services, programs, and information.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button
              variant="default"
              className="bg-gray-900 hover:bg-gray-800"
            >
              View Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};