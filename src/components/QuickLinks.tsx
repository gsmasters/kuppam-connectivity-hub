import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building, Users, Info, Phone } from "lucide-react";

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
      title: "Programs",
      description: "View our ongoing and upcoming programs",
      icon: Info,
      href: "#programs",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our office",
      icon: Phone,
      href: "#contact",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="transform transition-transform hover:scale-105"
            >
              <Card className="h-full">
                <CardHeader>
                  <link.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
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