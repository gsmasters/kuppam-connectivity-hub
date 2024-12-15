import { UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RepresentativesSectionProps {
  representatives: {
    MPP: Array<{ name: string; position: string; mobile: string }>;
    ZPTC: Array<{ name: string; position: string; mobile: string }>;
    Sarpanch: Array<{ name: string; position: string; mobile: string }>;
    MPTC?: Array<{ name: string; position: string; mobile: string }>;
  };
}

export const RepresentativesSection = ({ representatives }: RepresentativesSectionProps) => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <UserCheck className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Elected Representatives</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(representatives).map(([type, members]) => (
          <Card key={type} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{type}</h3>
            <div className="space-y-4">
              {members.map((rep, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium">{rep.name}</h4>
                  <p className="text-sm text-muted-foreground">{rep.position}</p>
                  {rep.mobile && (
                    <a 
                      href={`tel:${rep.mobile}`}
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      {rep.mobile}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};