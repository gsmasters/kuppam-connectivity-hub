import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Building2 } from "lucide-react";

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

interface ContactCardProps {
  member: StaffMember;
}

export const ContactCard = ({ member }: ContactCardProps) => (
  <div className="group p-6 bg-white rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
    <div className="flex justify-between items-start gap-4">
      <div className="space-y-3 flex-grow">
        <div>
          <h4 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
            {member.name}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {member.position || member.designation}
          </p>
        </div>
        
        {member.department && (
          <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
            {member.department}
          </Badge>
        )}
        
        {member.representative_type && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {member.representative_type.replace('_', ' ')}
          </Badge>
        )}
        
        {member.secretariat_name && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            {member.secretariat_name}
          </div>
        )}

        {member.mobile && (
          <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Phone className="h-4 w-4" />
            <a
              href={`tel:${member.mobile}`}
              className="text-sm font-medium hover:underline"
            >
              {member.mobile}
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);