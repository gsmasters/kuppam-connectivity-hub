import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface StaffSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestions?: string[];
}

export const StaffSearch = ({ searchQuery, onSearchChange, suggestions = [] }: StaffSearchProps) => {
  // Filter out any null/undefined/empty values and ensure unique values
  const validSuggestions = Array.from(new Set(
    suggestions.filter(Boolean).map(s => s.trim()).filter(Boolean)
  ));
  
  return (
    <div className="relative max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={onSearchChange}
          className="h-9"
        />
        {searchQuery?.trim() && (
          <CommandList>
            {validSuggestions.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions">
                {validSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    value={suggestion}
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