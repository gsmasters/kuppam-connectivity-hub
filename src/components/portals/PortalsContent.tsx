import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Portal {
  name: string;
  url: string;
}

interface PortalCategory {
  title: string;
  portals: Portal[];
}

export const PortalsContent = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const portalCategories: PortalCategory[] = [
    {
      title: "Important Links",
      portals: [
        {
          name: "Ministry of Panchayati Raj",
          url: "https://panchayat.gov.in/",
        },
        {
          name: "eGramSwaraj",
          url: "https://egramswaraj.gov.in/",
        },
        {
          name: "NREGA National Portal",
          url: "https://nrega.nic.in/",
        },
      ],
    },
    {
      title: "Government Portals",
      portals: [
        {
          name: "Rural Development",
          url: "https://rd.ap.gov.in/",
        },
        {
          name: "AP Government Portal",
          url: "https://www.ap.gov.in/",
        },
        {
          name: "NITI Aayog",
          url: "https://www.niti.gov.in/",
        },
        {
          name: "Digital Panchayat AP",
          url: "https://digitalpanchayat.ap.gov.in/",
        },
        {
          name: "AP Panchayat Portal",
          url: "https://appanchayats.ap.gov.in/APPRPortal/",
        },
      ],
    },
  ];

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#DD4814]">
        Government Portals
      </h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {portalCategories.map((category) => (
          <Card
            key={category.title}
            className="border-t-4 border-t-[#DD4814] hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-colors duration-200"
              >
                <h2 className="text-xl font-semibold text-[#DD4814]">
                  {category.title}
                </h2>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-[#DD4814] transition-transform duration-200",
                    openCategory === category.title && "transform rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200 ease-in-out",
                  openCategory === category.title
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 space-y-3">
                    {category.portals.map((portal) => (
                      <a
                        key={portal.name}
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
                      >
                        <span className="text-gray-700 group-hover:text-[#DD4814] transition-colors duration-200">
                          {portal.name}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#DD4814] transition-colors duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};