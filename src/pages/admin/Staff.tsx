import { StaffManager } from "@/components/admin/StaffManager";
import { AdminLayout } from "@/components/admin/AdminLayout";

const StaffPage = () => {
  return (
    <AdminLayout>
      <StaffManager />
    </AdminLayout>
  );
};

export default StaffPage;