import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, UserCheck, Users } from "lucide-react";

interface StaffTabsProps {
  counts: {
    mandal_office: number;
    mandal_officers: number;
    sachivalayam: number;
    representatives: number;
  };
}

export const StaffTabs = ({ counts }: StaffTabsProps) => (
  <TabsList className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-muted/50 p-1">
    <TabsTrigger 
      value="mandal_office" 
      className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Building2 className="h-5 w-5" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">Office</span>
        <span className="text-xs text-muted-foreground">{counts.mandal_office}</span>
      </div>
    </TabsTrigger>
    
    <TabsTrigger 
      value="mandal_officers" 
      className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Users className="h-5 w-5" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">Officers</span>
        <span className="text-xs text-muted-foreground">{counts.mandal_officers}</span>
      </div>
    </TabsTrigger>
    
    <TabsTrigger 
      value="sachivalayam" 
      className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <MapPin className="h-5 w-5" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">Sach.</span>
        <span className="text-xs text-muted-foreground">{counts.sachivalayam}</span>
      </div>
    </TabsTrigger>
    
    <TabsTrigger 
      value="representatives" 
      className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <UserCheck className="h-5 w-5" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">Reps.</span>
        <span className="text-xs text-muted-foreground">{counts.representatives}</span>
      </div>
    </TabsTrigger>
  </TabsList>
);