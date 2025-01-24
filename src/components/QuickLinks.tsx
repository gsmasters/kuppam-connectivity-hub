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
      title: "Grievance Portal",
      description: "Submit and track your grievances",
      icon: Building,
      href: "https://meekosam.ap.gov.in/",
      external: true
    },
    {
      title: "RTI Information",
      description: "Access Right to Information details",
      icon: Users,
      href: "#rti",
    },
    {
      title: "Latest News",
      description: "Stay updated with recent announcements",
      icon: Calendar,
      href: "#news",
    }
  ];

  return (
    <section 
      className="py-16 bg-gradient-to-r from-amber-500/10 to-amber-600/20"
      aria-labelledby="quick-access-title"
    >
      <div className="container mx-auto px-4">
        <h2 
          id="quick-access-title"
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#DD4814]"
        >
          Quick Access
        </h2>
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="navigation"
          aria-label="Quick access links"
        >
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="transform transition-transform hover:scale-105"
              aria-label={`${link.title} - ${link.description}`}
            >
              <Card className="h-full border-t-4 border-t-[#DD4814] bg-white/90 backdrop-blur-sm hover:bg-white transition-colors">
                <CardHeader>
                  <div aria-hidden="true">
                    <link.icon className="h-8 w-8 text-[#DD4814] mb-2" />
                  </div>
                  <CardTitle className="text-lg text-[#DD4814]">
                    {link.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {link.description}
                  </CardDescription>
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