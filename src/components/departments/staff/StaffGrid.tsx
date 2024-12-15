import { Users } from "lucide-react";
import { ContactCard } from "./ContactCard";

interface StaffMember {
  id: string;
  name: string;
  position?: string;
  designation?: string;
  mobile?: string;
  department?: string;
  secretariat_name?: string;
}

interface StaffGridProps {
  staff: StaffMember[];
  isLoading: boolean;
}

export const StaffGrid = ({ staff, isLoading }: StaffGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Users className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  if (staff.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">No staff members found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {staff.map((member) => (
        <ContactCard key={member.id} member={member} />
      ))}
    </div>
  );
};