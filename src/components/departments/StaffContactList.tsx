import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Phone, Users, MapPin, Building2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface StaffMember {
  id: string;
  name: string;
  position?: string;
  designation?: string;
  mobile?: string;
  department?: string;
  secretariat_name?: string;
}

export const StaffContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: mandalOfficers, isLoading: isLoadingOfficers } = useQuery({
    queryKey: ["mandal-officers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", "mandal_officer")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: sachivalayamStaff, isLoading: isLoadingSachivalayam } = useQuery({
    queryKey: ["sachivalayam-staff"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sachivalayam_staff")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const filterStaff = (staff: StaffMember[] | null) => {
    if (!staff) return [];
    return staff.filter(member => 
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mobile?.includes(searchQuery) ||
      member.secretariat_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredOfficers = filterStaff(mandalOfficers);
  const filteredSachivalayam = filterStaff(sachivalayamStaff);

  const ContactCard = ({ member }: { member: StaffMember }) => (
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Staff Directory
        </CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Search by name, department, designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mandal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="mandal" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Mandal Officers
            </TabsTrigger>
            <TabsTrigger value="sachivalayam" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Sachivalayam Staff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mandal">
            {isLoadingOfficers ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredOfficers.map((officer) => (
                  <ContactCard key={officer.id} member={officer} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sachivalayam">
            {isLoadingSachivalayam ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredSachivalayam.map((staff) => (
                  <ContactCard key={staff.id} member={staff} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};