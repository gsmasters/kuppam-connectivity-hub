import { Users } from "lucide-react";
import { ContactCard } from "./ContactCard";
import { StaffMember } from "@/types/staff";
import { DEPARTMENTS } from "@/utils/staff-helpers";

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

  const groupedStaff = showDepartment
    ? staff.reduce((acc: Record<string, StaffMember[]>, member) => {
        const dept = 'department' in member ? 
          DEPARTMENTS.find(d => d === member.department) || 'Other' : 
          'Other';
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
      <div className="border-b pb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
        {workingCount !== undefined && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm font-medium">Working Staff:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {workingCount}
            </span>
            <span className="text-sm text-muted-foreground">out of {totalCount}</span>
          </div>
        )}
      </div>

      {(showDepartment || isRepresentative) ? (
        Object.entries(groupedStaff).map(([group, members]) => (
          <div key={group} className="space-y-4">
            <h4 className="text-lg font-medium capitalize">{group}</h4>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {members.map((member, index) => (
                <ContactCard key={member.id} member={member} index={index + 1} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {staff.map((member, index) => (
            <ContactCard key={member.id} member={member} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
