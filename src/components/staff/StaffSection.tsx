import { Building2, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface StaffSectionProps {
  departments: Array<{
    title: string;
    staff: Array<{
      name: string;
      position: string;
      mobile: string;
      email?: string;
      location?: string;
    }>;
  }>;
}

export const StaffSection = ({ departments }: StaffSectionProps) => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Departments</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {departments.map((dept, index) => (
          <AccordionItem key={index} value={`dept-${index}`} className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">{dept.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Card className="p-4">
                <div className="space-y-4">
                  {dept.staff.map((member, staffIndex) => (
                    <div key={staffIndex} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-medium text-lg">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                      {member.mobile && (
                        <a 
                          href={`tel:${member.mobile}`}
                          className="text-sm text-primary hover:underline mt-1 inline-block"
                        >
                          {member.mobile}
                        </a>
                      )}
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-sm text-primary hover:underline block mt-1"
                        >
                          {member.email}
                        </a>
                      )}
                      {member.location && (
                        <p className="text-sm text-muted-foreground mt-1">{member.location}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};