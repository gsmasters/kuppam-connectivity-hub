import { Badge } from "@/components/ui/badge";
import { Phone, MapPin } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  position?: string;
  designation?: string;
  mobile?: string;
  department?: string;
  secretariat_name?: string;
}

interface ContactCardProps {
  member: StaffMember;
}

export const ContactCard = ({ member }: ContactCardProps) => (
  <div className="p-4 bg-white rounded-lg border hover:border-primary/20 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-medium text-gray-900">{member.name}</h4>
        <p className="text-sm text-gray-600 mt-1">
          {member.position || member.designation}
        </p>
        {member.department && (
          <Badge variant="outline" className="mt-2">
            {member.department}
          </Badge>
        )}
        {member.secretariat_name && (
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {member.secretariat_name}
          </div>
        )}
      </div>
      {member.mobile && (
        <a
          href={`tel:${member.mobile}`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span className="text-sm">{member.mobile}</span>
        </a>
      )}
    </div>
  </div>
);