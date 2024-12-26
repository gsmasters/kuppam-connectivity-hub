import { Card, CardContent } from "@/components/ui/card";
import { Building, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "About Us",
    description: "Learn about our mission, vision, and the dedicated team serving Kuppam Mandal",
    icon: Building,
    link: "/about-us",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Programs & Initiatives",
    description: "Explore our various development programs and welfare schemes",
    icon: FileText,
    link: "/programs",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Staff Directory",
    description: "Connect with our officials and staff members serving the community",
    icon: Users,
    link: "/staff-directory",
    gradient: "from-purple-500 to-pink-500"
  }
];

export const PageHighlights = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <Link key={index} to={highlight.link}>
              <Card className="h-full transition-transform duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${highlight.gradient} flex items-center justify-center mb-4`}>
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};