import { Users } from "lucide-react";

interface StaffStatsProps {
  totalWorkingStaff: number;
}

export const StaffStats = ({ totalWorkingStaff }: StaffStatsProps) => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Users className="h-5 w-5" />
      <span className="font-medium">
        Total Working Staff: {totalWorkingStaff}
      </span>
    </div>
  );
};