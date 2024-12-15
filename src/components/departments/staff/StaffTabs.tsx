import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, UserCheck, Users } from "lucide-react";

interface StaffTabsProps {
  counts: {
    mandal_office: number;
    mandal_officers: number;
    sachivalayam: number;
    representatives: number;
  };
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const StaffTabs = ({ counts, activeTab = "mandal_officers", onTabChange }: StaffTabsProps) => (
  <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
    <TabsList className="inline-flex h-auto items-center justify-start gap-4 rounded-xl bg-transparent p-0 w-full flex-wrap">
      <TabsTrigger 
        value="mandal_officers" 
        className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full sm:w-auto min-h-[80px]"
      >
        <Users className="h-5 w-5 text-orange-500 shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-orange-500 whitespace-normal">Mandal Officers</span>
          <span className="text-lg font-semibold">{counts.mandal_officers}</span>
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="mandal_office" 
        className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full sm:w-auto min-h-[80px]"
      >
        <Building2 className="h-5 w-5 text-green-600 shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-green-600 whitespace-normal">Mandal Office Staff</span>
          <span className="text-lg font-semibold">{counts.mandal_office}</span>
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="sachivalayam" 
        className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full sm:w-auto min-h-[80px]"
      >
        <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-blue-600 whitespace-normal">Sachivalayam Staff</span>
          <span className="text-lg font-semibold">{counts.sachivalayam}</span>
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="representatives" 
        className="flex items-center gap-3 px-6 py-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl transition-all border border-border/50 hover:border-primary/20 bg-white w-full sm:w-auto min-h-[80px]"
      >
        <UserCheck className="h-5 w-5 text-gray-600 shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-600 whitespace-normal">Elected Representatives</span>
          <span className="text-lg font-semibold">{counts.representatives}</span>
        </div>
      </TabsTrigger>
    </TabsList>
  </Tabs>
);