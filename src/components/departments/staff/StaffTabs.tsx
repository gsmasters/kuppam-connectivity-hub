import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Building, Briefcase, User, Factory } from "lucide-react";

export const StaffTabs = () => (
  <TabsList className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-muted/50 p-1">
    <TabsTrigger 
      value="mandal" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Building2 className="h-4 w-4" />
      <span className="hidden sm:inline">Mandal Officers</span>
      <span className="sm:hidden">Mandal</span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="sachivalayam" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <MapPin className="h-4 w-4" />
      <span className="hidden sm:inline">Sachivalayam</span>
      <span className="sm:hidden">Sach.</span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="revenue" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Building className="h-4 w-4" />
      <span>Revenue</span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="education" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Briefcase className="h-4 w-4" />
      <span>Education</span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="health" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <User className="h-4 w-4" />
      <span>Health</span>
    </TabsTrigger>
    
    <TabsTrigger 
      value="agriculture" 
      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      <Factory className="h-4 w-4" />
      <span>Agriculture</span>
    </TabsTrigger>
  </TabsList>
);