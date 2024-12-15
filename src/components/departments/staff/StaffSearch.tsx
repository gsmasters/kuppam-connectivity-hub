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

  // Ensure suggestions is always an array
  const validSuggestions = Array.isArray(suggestions) ? suggestions : [];

  // Only show suggestions if search query is at least 2 characters
  const shouldShowSuggestions = searchQuery.length >= 2;

  return (
    <div className="relative max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={(value) => {
            onSearchChange(value);
            setOpen(value.length >= 2);
          }}
          className="h-9"
        />
        {open && shouldShowSuggestions && (
          <CommandList>
            {!validSuggestions.length ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions">
                {validSuggestions.map((suggestion) => (
                  suggestion && (
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
                  )
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};