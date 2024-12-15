import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutUsEditor } from "./pages/AboutUsEditor";
import { DashboardTabs } from "./dashboard/DashboardTabs";

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MPDO Office Dashboard</h1>
      <div className="space-y-6">
        <DashboardTabs />
      </div>
    </div>
  );
};