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
      <div className="flex items-center justify-center p-8">
        <Users className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {staff.map((member) => (
        <ContactCard key={member.id} member={member} />
      ))}
    </div>
  );
};