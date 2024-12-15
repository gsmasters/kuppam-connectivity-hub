import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MandalOfficeStaff } from "./staff/MandalOfficeStaff";
import { ElectedRepresentatives } from "./staff/ElectedRepresentatives";
import { SachivalayamStaff } from "./staff/SachivalayamStaff";
import { MandalOfficers } from "./staff/MandalOfficers";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const StaffManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("mandal_office");

  const handleAddStaff = () => {
    toast({
      title: "Coming Soon",
      description: "The add staff functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <Button onClick={handleAddStaff} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="mandal_office">Mandal Office Staff</TabsTrigger>
          <TabsTrigger value="elected">Elected Representatives</TabsTrigger>
          <TabsTrigger value="sachivalayam">Sachivalayam Staff</TabsTrigger>
          <TabsTrigger value="officers">Mandal Officers</TabsTrigger>
        </TabsList>

        <TabsContent value="mandal_office">
          <MandalOfficeStaff />
        </TabsContent>

        <TabsContent value="elected">
          <ElectedRepresentatives />
        </TabsContent>

        <TabsContent value="sachivalayam">
          <SachivalayamStaff />
        </TabsContent>

        <TabsContent value="officers">
          <MandalOfficers />
        </TabsContent>
      </Tabs>
    </div>
  );
};