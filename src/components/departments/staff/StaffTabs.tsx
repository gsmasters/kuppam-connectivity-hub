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
  <TabsList className="inline-flex h-auto items-center justify-start gap-4 rounded-xl bg-transparent p-0 w-full">
    <TabsTrigger 
      value="mandal_officers" 
      className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full md:w-auto"
    >
      <Users className="h-5 w-5 text-orange-500" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-orange-500">Officers</span>
        <span className="text-lg font-semibold">{counts.mandal_officers}</span>
      </div>
    </TabsTrigger>
    
    <TabsTrigger 
      value="sachivalayam" 
      className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full md:w-auto"
    >
      <MapPin className="h-5 w-5 text-blue-600" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-blue-600">Sach.</span>
        <span className="text-lg font-semibold">{counts.sachivalayam}</span>
      </div>
    </TabsTrigger>
    
    <TabsTrigger 
      value="representatives" 
      className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full md:w-auto"
    >
      <UserCheck className="h-5 w-5 text-gray-600" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-gray-600">Reps.</span>
        <span className="text-lg font-semibold">{counts.representatives}</span>
      </div>
    </TabsTrigger>
  </TabsList>
);