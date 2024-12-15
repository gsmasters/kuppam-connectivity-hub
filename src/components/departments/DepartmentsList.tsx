import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { DEPARTMENTS } from "@/utils/staff-helpers";

export const DepartmentsList = () => {
  return (
    <Card className="shadow-lg border-none mt-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Departments</CardTitle>
            <CardDescription>List of all departments in the mandal</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent/50 transition-colors"
            >
              <p className="font-medium">{department}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};