import { Building2, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Representative {
  name: string;
  position: string;
  mobile: string;
}

interface ElectedRepresentativesProps {
  data: {
    MPP: Representative[];
    ZPTC: Representative[];
    Sarpanch: Representative[];
    MPTC?: Representative[];
  };
}

export const ElectedRepresentatives = ({ data }: ElectedRepresentativesProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          <span>Elected Representatives</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="MPP" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="MPP">MPP</TabsTrigger>
            <TabsTrigger value="ZPTC">ZPTC</TabsTrigger>
            <TabsTrigger value="Sarpanch">Sarpanch</TabsTrigger>
            {data.MPTC && <TabsTrigger value="MPTC">MPTC</TabsTrigger>}
          </TabsList>
          <TabsContent value="MPP" className="mt-4 space-y-4">
            {data.MPP.map((member, index) => (
              <RepresentativeCard key={index} member={member} />
            ))}
          </TabsContent>
          <TabsContent value="ZPTC" className="mt-4 space-y-4">
            {data.ZPTC.map((member, index) => (
              <RepresentativeCard key={index} member={member} />
            ))}
          </TabsContent>
          <TabsContent value="Sarpanch" className="mt-4 space-y-4">
            {data.Sarpanch.map((member, index) => (
              <RepresentativeCard key={index} member={member} />
            ))}
          </TabsContent>
          {data.MPTC && (
            <TabsContent value="MPTC" className="mt-4 space-y-4">
              {data.MPTC.map((member, index) => (
                <RepresentativeCard key={index} member={member} />
              ))}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const RepresentativeCard = ({ member }: { member: Representative }) => (
  <div className="p-4 bg-white rounded-lg border hover:border-blue-200 transition-colors">
    <h4 className="font-medium text-gray-900">{member.name}</h4>
    <p className="text-sm text-gray-600 mt-1">{member.position}</p>
    <div className="mt-2 flex items-center text-gray-600 text-sm">
      <Phone className="h-4 w-4 mr-2" />
      <span>{member.mobile}</span>
    </div>
  </div>
);