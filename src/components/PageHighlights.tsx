import { Card, CardContent } from "@/components/ui/card";
import { Building, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "About Us",
    description: "Learn about our mission, vision, and the dedicated team serving Kuppam Mandal",
    icon: Building,
    link: "/about-us",
    gradient: "from-[#DD4814] to-[#F4A261]"
  },
  {
    title: "Programs & Initiatives",
    description: "Explore our various development programs and welfare schemes",
    icon: FileText,
    link: "/programs",
    gradient: "from-[#E9C46A] to-[#F4A261]"
  },
  {
    title: "Staff Directory",
    description: "Connect with our officials and staff members serving the community",
    icon: Users,
    link: "/staff-directory",
    gradient: "from-[#DD4814] to-[#E9C46A]"
  }
];

export const PageHighlights = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Explore Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Link key={index} to={highlight.link}>
              <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${highlight.gradient} flex items-center justify-center mb-6`}>
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{highlight.title}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};