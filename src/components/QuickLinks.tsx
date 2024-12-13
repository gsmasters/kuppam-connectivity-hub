import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building, Users, Info, Phone, FileText, Calendar, BookOpen, HelpCircle } from "lucide-react";

export const QuickLinks = () => {
  const links = [
    {
      title: "About MPDO",
      description: "Learn about our roles and responsibilities",
      icon: Building,
      href: "#about",
    },
    {
      title: "Staff Directory",
      description: "Find contact information for our staff",
      icon: Users,
      href: "#staff",
    },
    {
      title: "Programs & Schemes",
      description: "View our ongoing and upcoming programs",
      icon: Calendar,
      href: "#programs",
    },
    {
      title: "Documents",
      description: "Access important forms and documents",
      icon: FileText,
      href: "#documents",
    },
    {
      title: "News & Updates",
      description: "Stay informed about latest developments",
      icon: Info,
      href: "#news",
    },
    {
      title: "RTI",
      description: "Right to Information Act portal",
      icon: BookOpen,
      href: "#rti",
    },
    {
      title: "Grievance",
      description: "Submit and track your grievances",
      icon: HelpCircle,
      href: "https://meekosam.ap.gov.in/",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our office",
      icon: Phone,
      href: "#contact",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#2C2A3C] to-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white/90 tracking-tight">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="transform transition-all duration-300 hover:translate-y-[-4px]"
            >
              <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4">
                    <link.icon className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <CardTitle className="text-xl text-white/90">{link.title}</CardTitle>
                  <CardDescription className="text-white/60">{link.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};