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

  return (
    <div className="relative max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={(value) => {
            onSearchChange(value);
            setOpen(value.length > 0);
          }}
          className="h-9"
        />
        {open && searchQuery && (
          <CommandList>
            {!suggestions?.length ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion) => (
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