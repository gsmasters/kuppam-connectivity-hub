import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface StaffSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestions?: string[];
}

export const StaffSearch = ({ searchQuery, onSearchChange, suggestions = [] }: StaffSearchProps) => {
  // Ensure we always have a valid array of suggestions
  const validSuggestions = Array.isArray(suggestions) ? suggestions : [];
  
  return (
    <div className="relative max-w-sm">
      <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={onSearchChange}
          className="h-9"
        />
        {searchQuery && (
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {validSuggestions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {validSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    value={suggestion}
                    onSelect={(value) => onSearchChange(value)}
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