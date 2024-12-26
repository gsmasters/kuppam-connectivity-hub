import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center space-y-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Welcome to MPDO Office Kuppam
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Serving the community with dedication and transparency. Access government services, stay updated with latest programs, and connect with your local administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/programs">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                Explore Programs
              </Button>
            </Link>
            <Link to="/staff-directory">
              <Button variant="outline" className="w-full sm:w-auto">
                Staff Directory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};