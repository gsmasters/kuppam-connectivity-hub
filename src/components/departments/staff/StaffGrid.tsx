import { Users } from "lucide-react";
import { ContactCard } from "./ContactCard";
import { StaffMember } from "@/types/staff";

interface StaffGridProps {
  staff: StaffMember[];
  isLoading: boolean;
  title: string;
  description: string;
  isRepresentative?: boolean;
  showDepartment?: boolean;
  totalCount?: number;
  workingCount?: number;
}

export const StaffGrid = ({ 
  staff, 
  isLoading, 
  title, 
  description, 
  isRepresentative,
  showDepartment,
  totalCount,
  workingCount
}: StaffGridProps) => {
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

  // Group staff by department if showDepartment is true
  const groupedStaff = showDepartment
    ? staff.reduce((acc: Record<string, StaffMember[]>, member) => {
        const dept = 'department' in member ? member.department || 'Other' : 'Other';
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(member);
        return acc;
      }, {})
    : isRepresentative
    ? staff.reduce((acc: Record<string, StaffMember[]>, member) => {
        const type = 'representative_type' in member ? member.representative_type : 'Other';
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
        <div className="flex gap-4 mt-2">
          {totalCount !== undefined && (
            <p className="text-sm text-primary font-medium">
              Total Staff: {totalCount}
            </p>
          )}
          {workingCount !== undefined && (
            <p className="text-sm text-green-600 font-medium">
              Working Staff: {workingCount}
            </p>
          )}
        </div>
      </div>

      {(showDepartment || isRepresentative) ? (
        Object.entries(groupedStaff).map(([group, members]) => (
          <div key={group} className="space-y-4">
            <h4 className="text-lg font-medium capitalize">{group.replace('_', ' ')}</h4>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {members.map((member, index) => (
                <ContactCard key={member.id} member={member} index={index + 1} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {staff.map((member, index) => (
            <ContactCard key={member.id} member={member} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};