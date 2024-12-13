import { ElectedRepresentatives } from "@/components/departments/ElectedRepresentatives";
import { UserCheck } from "lucide-react";

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
      <ElectedRepresentatives data={representatives} />
    </section>
  );
};