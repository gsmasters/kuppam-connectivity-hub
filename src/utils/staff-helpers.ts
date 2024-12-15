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
  if (!allStaff?.length || !searchQuery?.trim()) return [];
  
  const suggestions = new Set<string>();
  
  allStaff.forEach(member => {
    if (!member) return;

    // Only add non-null/undefined values
    if (member.name?.trim()) suggestions.add(member.name.trim());
    if (member.mobile?.trim()) suggestions.add(member.mobile.trim());
    
    if (isMandalStaff(member)) {
      if (member.department?.trim()) suggestions.add(member.department.trim());
      if (member.position?.trim()) suggestions.add(member.position.trim());
    }
    
    if (isSachivalayamStaff(member)) {
      if (member.designation?.trim()) suggestions.add(member.designation.trim());
      if (member.secretariat_name?.trim()) suggestions.add(member.secretariat_name.trim());
    }
    
    if (isElectedRepresentative(member)) {
      if (member.position?.trim()) suggestions.add(member.position.trim());
      if (member.representative_type?.trim()) suggestions.add(member.representative_type.trim());
    }
  });
  
  return Array.from(suggestions)
    .filter(suggestion => 
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 10);
};

export const filterStaff = (staff: StaffMember[] | null | undefined, searchQuery: string): StaffMember[] => {
  if (!staff?.length) return [];
  if (!searchQuery?.trim()) return staff;

  const query = searchQuery.toLowerCase().trim();
  return staff.filter(member => {
    if (!member) return false;

    const baseFields = [
      member.name, 
      member.mobile
    ].filter(Boolean);
    
    if (isMandalStaff(member)) {
      baseFields.push(
        member.position,
        member.department || ''
      );
    }
    
    if (isSachivalayamStaff(member)) {
      baseFields.push(
        member.designation,
        member.secretariat_name,
        member.secretariat_code || ''
      );
    }
    
    if (isElectedRepresentative(member)) {
      baseFields.push(
        member.position,
        member.representative_type,
        member.gram_panchayat || '',
        member.panchayat_name || ''
      );
    }
    
    return baseFields.some(field => 
      field?.toLowerCase().includes(query)
    );
  });
};