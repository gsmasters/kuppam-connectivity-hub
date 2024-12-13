import { Building2, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StaffMember {
  name: string;
  position: string;
  mobile: string;
  email?: string;
  location?: string;
}

interface DepartmentCardProps {
  title: string;
  staff: StaffMember[];
}

export const DepartmentCard = ({ title, staff }: DepartmentCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {staff.map((member, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border hover:border-blue-200 transition-colors"
            >
              <h4 className="font-medium text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{member.position}</p>
              {member.location && (
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{member.location}</span>
                </div>
              )}
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{member.mobile}</span>
                </div>
                {member.email && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{member.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};