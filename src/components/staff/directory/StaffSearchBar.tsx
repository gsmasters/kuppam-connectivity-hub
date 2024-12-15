import { StaffSearch } from "@/components/departments/staff/StaffSearch";

interface StaffSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestions: string[];
}

export const StaffSearchBar = ({ searchQuery, onSearchChange, suggestions }: StaffSearchBarProps) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <StaffSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        suggestions={suggestions}
      />
    </div>
  );
};