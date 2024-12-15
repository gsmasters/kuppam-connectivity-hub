import { StaffMember, MandalStaff, SachivalayamStaff, ElectedRepresentative } from "@/types/staff";

export function isMandalStaff(staff: StaffMember): staff is MandalStaff {
  return 'staff_type' in staff && 'position' in staff && !('representative_type' in staff);
}

export function isSachivalayamStaff(staff: StaffMember): staff is SachivalayamStaff {
  return 'secretariat_name' in staff && 'designation' in staff;
}

export function isElectedRepresentative(staff: StaffMember): staff is ElectedRepresentative {
  return 'representative_type' in staff;
}

export const getSearchSuggestions = (allStaff: StaffMember[] | undefined, searchQuery: string): string[] => {
  // Return empty array if no staff or no search query
  if (!allStaff?.length || !searchQuery?.trim()) {
    return [];
  }
  
  const suggestions = new Set<string>();
  const query = searchQuery.toLowerCase().trim();
  
  allStaff.forEach(member => {
    if (!member) return;

    // Helper function to add suggestion if it matches query
    const addIfMatches = (value: string | undefined | null) => {
      if (value?.trim() && value.toLowerCase().includes(query)) {
        suggestions.add(value.trim());
      }
    };

    // Add basic fields
    addIfMatches(member.name);
    addIfMatches(member.mobile);
    
    if (isMandalStaff(member)) {
      addIfMatches(member.position);
      addIfMatches(member.department);
    }
    
    if (isSachivalayamStaff(member)) {
      addIfMatches(member.designation);
      addIfMatches(member.secretariat_name);
      addIfMatches(member.secretariat_code);
    }
    
    if (isElectedRepresentative(member)) {
      addIfMatches(member.position);
      addIfMatches(member.representative_type);
      addIfMatches(member.gram_panchayat);
      addIfMatches(member.panchayat_name);
    }
  });
  
  return Array.from(suggestions).slice(0, 10);
};

export const filterStaff = (staff: StaffMember[] | null | undefined, searchQuery: string): StaffMember[] => {
  if (!staff?.length) return [];
  if (!searchQuery?.trim()) return staff;

  const query = searchQuery.toLowerCase().trim();
  
  return staff.filter(member => {
    if (!member) return false;

    const searchableFields = [
      member.name,
      member.mobile,
      isMandalStaff(member) && [member.position, member.department],
      isSachivalayamStaff(member) && [
        member.designation,
        member.secretariat_name,
        member.secretariat_code
      ],
      isElectedRepresentative(member) && [
        member.position,
        member.representative_type,
        member.gram_panchayat,
        member.panchayat_name
      ]
    ].flat().filter(Boolean);

    return searchableFields.some(field => 
      field?.toString().toLowerCase().includes(query)
    );
  });
};