import { DepartmentCard } from "@/components/departments/DepartmentCard";
import { Building2, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
              <DepartmentCard title={dept.title} staff={dept.staff} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};