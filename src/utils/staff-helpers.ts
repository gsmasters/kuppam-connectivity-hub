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

export const getSearchSuggestions = (allStaff: StaffMember[], searchQuery: string): string[] => {
  const suggestions = new Set<string>();
  
  allStaff.forEach(member => {
    if (member.name) suggestions.add(member.name);
    if (member.mobile) suggestions.add(member.mobile);
    
    if (isMandalStaff(member)) {
      if (member.department) suggestions.add(member.department);
      if (member.position) suggestions.add(member.position);
    }
    
    if (isSachivalayamStaff(member)) {
      if (member.designation) suggestions.add(member.designation);
      if (member.secretariat_name) suggestions.add(member.secretariat_name);
    }
    
    if (isElectedRepresentative(member)) {
      if (member.position) suggestions.add(member.position);
      if (member.representative_type) suggestions.add(member.representative_type);
    }
  });
  
  return Array.from(suggestions)
    .filter(suggestion => 
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 10);
};

export const filterStaff = (staff: StaffMember[] | null, searchQuery: string): StaffMember[] => {
  if (!staff) return [];
  if (!searchQuery.trim()) return staff;

  const query = searchQuery.toLowerCase().trim();
  return staff.filter(member => {
    const baseFields = [member.name, member.mobile];
    
    if (isMandalStaff(member)) {
      baseFields.push(member.position, member.department || '');
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