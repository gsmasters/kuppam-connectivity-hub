import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, UserCheck } from "lucide-react";

interface StaffTabsProps {
  counts: {
    mandal: number;
    sachivalayam: number;
    representatives: number;
  };
}

export const StaffTabs = ({ counts }: StaffTabsProps) => (
  <TabsList className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-muted/50 p-1">
    <TabsTrigger 
      value="mandal" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Building2 className="h-4 w-4" />
      <span className="hidden sm:inline">Mandal Officers</span>
      <span className="sm:hidden">Mandal</span>
      <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
        {counts.mandal}
      </span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="sachivalayam" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <MapPin className="h-4 w-4" />
      <span className="hidden sm:inline">Sachivalayam</span>
      <span className="sm:hidden">Sach.</span>
      <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
        {counts.sachivalayam}
      </span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="representatives" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <UserCheck className="h-4 w-4" />
      <span>Representatives</span>
      <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
        {counts.representatives}
      </span>
    </TabsTrigger>
  </TabsList>
);