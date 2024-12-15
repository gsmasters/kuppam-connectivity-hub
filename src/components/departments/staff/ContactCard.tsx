import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Building2 } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  index?: number;
}

// Common Indian name prefixes
const commonPrefixes = ['Sri', 'Smt', 'Dr', 'Mr', 'Mrs', 'Ms'];

// Common designations
const commonDesignations = [
  'Village Secretary',
  'Digital Assistant',
  'Welfare Assistant',
  'Ward Secretary',
  'Ward Welfare & Development Secretary',
  'Engineering Assistant',
  'Sanitation Secretary',
  'Education & Data Processing Secretary',
  'Women Police',
  'ANM',
  'Mahila Police',
  'Agriculture Assistant',
  'Animal Husbandry Assistant',
  'Electricity Lineman',
  'Panchayat Secretary',
  'Revenue Secretary',
];

const suggestCorrections = (name: string, type: 'name' | 'designation') => {
  if (type === 'name') {
    // Check if name has proper prefix
    const hasPrefix = commonPrefixes.some(prefix => 
      name.toLowerCase().startsWith(prefix.toLowerCase())
    );
    if (!hasPrefix) {
      return `Consider adding a prefix (${commonPrefixes.join(', ')})`;
    }
  } else if (type === 'designation') {
    // Find similar designations
    const similar = commonDesignations.find(d => 
      d.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(d.toLowerCase())
    );
    if (similar && similar !== name) {
      return `Did you mean: ${similar}?`;
    }
  }
  return null;
};

export const ContactCard = ({ member, index }: ContactCardProps) => {
  const nameCorrection = suggestCorrections(member.name, 'name');
  const designationCorrection = member.position && 
    suggestCorrections(member.position, 'designation') || 
    member.designation && 
    suggestCorrections(member.designation, 'designation');

  return (
    <div className="group p-6 bg-white rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-2">
            {index !== undefined && (
              <span className="text-sm font-medium text-muted-foreground">
                {index}.
              </span>
            )}
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h4 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                      {member.name}
                      {nameCorrection && (
                        <span className="ml-1 text-xs text-amber-500">*</span>
                      )}
                    </h4>
                  </TooltipTrigger>
                  {nameCorrection && (
                    <TooltipContent>
                      <p className="text-sm">{nameCorrection}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.position || member.designation}
                      {designationCorrection && (
                        <span className="ml-1 text-xs text-amber-500">*</span>
                      )}
                    </p>
                  </TooltipTrigger>
                  {designationCorrection && (
                    <TooltipContent>
                      <p className="text-sm">{designationCorrection}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
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
};