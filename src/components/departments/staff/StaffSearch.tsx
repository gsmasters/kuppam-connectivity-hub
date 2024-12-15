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
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full max-w-xl mx-auto">
        <Command className="rounded-xl border shadow-sm bg-white">
          <CommandInput
            placeholder="Search by name, position, department..."
            value={searchQuery}
            onValueChange={onSearchChange}
            className="h-12 text-base"
          />
        </Command>
      </div>
    );
  }

  const validSuggestions = (Array.isArray(suggestions) ? suggestions : [])
    .filter((suggestion): suggestion is string => 
      typeof suggestion === 'string' && suggestion.trim().length > 0
    );

  const shouldShowSuggestions = searchQuery.trim().length >= 1;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Command className="rounded-xl border shadow-sm bg-white">
        <CommandInput
          placeholder="Search by name, position, department..."
          value={searchQuery}
          onValueChange={(value) => {
            onSearchChange(value);
            setOpen(true);
          }}
          className="h-12 text-base"
        />
        {open && (
          <CommandList className="absolute w-full bg-white border-t rounded-b-xl shadow-lg">
            {!shouldShowSuggestions ? (
              <CommandEmpty className="p-4 text-sm text-muted-foreground">
                Start typing to search...
              </CommandEmpty>
            ) : validSuggestions.length === 0 ? (
              <CommandEmpty className="p-4 text-sm text-muted-foreground">
                No results found.
              </CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions" className="p-2">
                {validSuggestions.map((suggestion, index) => (
                  <CommandItem
                    key={`${suggestion}-${index}`}
                    value={suggestion}
                    onSelect={(value) => {
                      onSearchChange(value);
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100 rounded-lg"
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