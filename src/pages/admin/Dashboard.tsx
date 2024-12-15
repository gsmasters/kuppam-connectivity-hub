import { DashboardCard } from "@/components/admin/dashboard/DashboardCard";
import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";
import { FileText, Layout, Users } from "lucide-react";

const Dashboard = () => {
  const dashboardCards = [
    {
      title: "Pages",
      description: "Manage website pages and their content",
      icon: Layout,
    },
    {
      title: "Content",
      description: "Manage content blocks and sections",
      icon: FileText,
    },
    {
      title: "Staff",
      description: "Manage staff directory and details",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;