import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Droplet, GraduationCap, Sprout, Users, Heart, Zap, UserCheck, Shield, Activity } from "lucide-react";
import { DEPARTMENTS } from "@/utils/staff-helpers";

const getDepartmentIcon = (department: string) => {
  switch (department) {
    case 'Panchayat Raj & Rural Development':
      return <Building2 className="h-5 w-5" />;
    case 'Irrigation Department':
      return <Droplet className="h-5 w-5" />;
    case 'Education Department':
      return <GraduationCap className="h-5 w-5" />;
    case 'Agriculture Department':
      return <Sprout className="h-5 w-5" />;
    case 'Social Welfare/ Tribal Welfare Department':
      return <Users className="h-5 w-5" />;
    case 'Animal Husbandry, Fisheries Department':
      return <Heart className="h-5 w-5" />;
    case 'Energy Department (Energy Assistant)':
      return <Zap className="h-5 w-5" />;
    case 'Home (Mahila Police/ Grama Mahila Samrakshana Karyadarshi) Department':
      return <Shield className="h-5 w-5" />;
    case 'Medical, Health & Family Welfare (Auxiliary Nurse Midwife (ANM)) Department':
      return <Activity className="h-5 w-5" />;
    default:
      return <UserCheck className="h-5 w-5" />;
  }
};

export const DepartmentsList = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Our Departments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary">{getDepartmentIcon(department)}</span>
                <p className="font-medium">{department}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};