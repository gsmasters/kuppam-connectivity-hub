import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useState, useEffect } from "react";

interface StaffSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestions?: string[];
}

export const StaffSearch = ({ searchQuery, onSearchChange, suggestions = [] }: StaffSearchProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before showing suggestions
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Early return with basic input if not mounted
  if (!mounted) {
    return (
      <div className="relative max-w-sm">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search by name, position, department..."
            value={searchQuery}
            onValueChange={onSearchChange}
            className="h-9"
          />
        </Command>
      </div>
    );
  }

  // Ensure suggestions is always an array and filter out any undefined/null/empty values
  const validSuggestions = (Array.isArray(suggestions) ? suggestions : [])
    .filter((suggestion): suggestion is string => 
      typeof suggestion === 'string' && suggestion.trim().length > 0
    );

  // Only show suggestions if search query is not empty and at least 1 character
  const shouldShowSuggestions = searchQuery.trim().length >= 1;

  return (
    <div className="relative max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={(value) => {
            onSearchChange(value);
            setOpen(value.trim().length >= 1);
          }}
          className="h-9"
        />
        {open && shouldShowSuggestions && (
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
                      setOpen(false);
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