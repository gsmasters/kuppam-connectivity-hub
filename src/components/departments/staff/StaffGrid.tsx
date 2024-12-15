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
  representative_type?: string;
}

interface StaffGridProps {
  staff: StaffMember[];
  isLoading: boolean;
  title: string;
  description: string;
  isRepresentative?: boolean;
}

export const StaffGrid = ({ staff, isLoading, title, description, isRepresentative }: StaffGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Users className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  if (staff.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50/50 rounded-lg border border-dashed">
        <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">No staff members found</p>
      </div>
    );
  }

  // Group representatives by type if needed
  const groupedStaff = isRepresentative
    ? staff.reduce((acc: Record<string, StaffMember[]>, member) => {
        const type = member.representative_type || 'Other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(member);
        return acc;
      }, {})
    : { 'all': staff };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
        <p className="text-sm text-primary font-medium mt-2">
          Total: {staff.length} {staff.length === 1 ? 'member' : 'members'}
        </p>
      </div>

      {isRepresentative ? (
        Object.entries(groupedStaff).map(([type, members]) => (
          <div key={type} className="space-y-4">
            <h4 className="text-lg font-medium capitalize">{type.replace('_', ' ')}</h4>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {members.map((member) => (
                <ContactCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {staff.map((member) => (
            <ContactCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};