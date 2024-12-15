import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building, Users, Calendar } from "lucide-react";

interface QuickLink {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  external?: boolean;
}

export const QuickLinks = () => {
  const links: QuickLink[] = [
    {
      title: "About Us",
      description: "Learn about our roles and responsibilities",
      icon: Building,
      href: "/about-us",
    },
    {
      title: "Staff Directory",
      description: "Find contact information for our staff",
      icon: Users,
      href: "/departments",
    },
    {
      title: "Programs",
      description: "View our ongoing and upcoming programs",
      icon: Calendar,
      href: "/",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-amber-500/10 to-amber-600/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#DD4814]">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="transform transition-transform hover:scale-105"
            >
              <Card className="h-full border-t-4 border-t-[#DD4814] bg-white/90 backdrop-blur-sm hover:bg-white transition-colors">
                <CardHeader>
                  <link.icon className="h-8 w-8 text-[#DD4814] mb-2" />
                  <CardTitle className="text-lg text-[#DD4814]">{link.title}</CardTitle>
                  <CardDescription className="text-gray-600">{link.description}</CardDescription>
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