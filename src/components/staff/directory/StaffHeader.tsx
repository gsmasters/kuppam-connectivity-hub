import { StaffStats } from "./StaffStats";

interface StaffHeaderProps {
  totalWorkingStaff: number;
}

export const StaffHeader = ({ totalWorkingStaff }: StaffHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Directory</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Browse and search through mandal office staff, mandal level officers, sachivalayam staff, and elected representatives
        </p>
      </div>
      <StaffStats totalWorkingStaff={totalWorkingStaff} />
    </div>
  );
};