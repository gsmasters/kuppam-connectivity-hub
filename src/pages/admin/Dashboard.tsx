import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your website content and staff directory
        </p>
      </div>
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;