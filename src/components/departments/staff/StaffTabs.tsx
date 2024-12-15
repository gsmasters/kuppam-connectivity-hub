import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Building, Briefcase, User, Factory } from "lucide-react";

export const StaffTabs = () => (
  <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2">
    <TabsTrigger value="mandal" className="flex items-center gap-2">
      <Building2 className="h-4 w-4" />
      Mandal Officers
    </TabsTrigger>
    <TabsTrigger value="sachivalayam" className="flex items-center gap-2">
      <MapPin className="h-4 w-4" />
      Sachivalayam
    </TabsTrigger>
    <TabsTrigger value="revenue" className="flex items-center gap-2">
      <Building className="h-4 w-4" />
      Revenue
    </TabsTrigger>
    <TabsTrigger value="education" className="flex items-center gap-2">
      <Briefcase className="h-4 w-4" />
      Education
    </TabsTrigger>
    <TabsTrigger value="health" className="flex items-center gap-2">
      <User className="h-4 w-4" />
      Health
    </TabsTrigger>
    <TabsTrigger value="agriculture" className="flex items-center gap-2">
      <Factory className="h-4 w-4" />
      Agriculture
    </TabsTrigger>
  </TabsList>
);