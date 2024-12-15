import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { StaffMember } from "@/types/staff";

interface StaffSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestions: string[];
}

export const StaffSearch = ({ searchQuery, onSearchChange, suggestions }: StaffSearchProps) => {
  return (
    <div className="relative max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={onSearchChange}
          className="h-9"
        />
        {searchQuery && (
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {suggestions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    onSelect={(value) => {
                      onSearchChange(value);
                    }}
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};