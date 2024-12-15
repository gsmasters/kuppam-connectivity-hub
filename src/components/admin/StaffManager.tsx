import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MandalOfficeStaff } from "./staff/MandalOfficeStaff";
import { ElectedRepresentatives } from "./staff/ElectedRepresentatives";
import { SachivalayamStaff } from "./staff/SachivalayamStaff";
import { MandalOfficers } from "./staff/MandalOfficers";

export const StaffManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Staff Management</h2>
      </div>

      <Tabs defaultValue="mandal_office" className="space-y-4">
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