import { StaffMember, MandalStaff, SachivalayamStaff, ElectedRepresentative } from "@/types/staff";

export const DEPARTMENTS = [
  'Panchayat Raj & Rural Development',
  'Panchayat Raj & Rural Development (Engineering)',
  'Irrigation Department',
  'Education Department',
  'Social Welfare/ Tribal Welfare Department',
  'Agriculture Department',
  'Animal Husbandry, Fisheries Department',
  'Revenue (Village Revenue Officer & Survey Assistant) Department',
  'Home (Mahila Police/ Grama Mahila Samrakshana Karyadarshi) Department',
  'Energy Department (Energy Assistant)',
  'Medical, Health & Family Welfare (Auxiliary Nurse Midwife (ANM)) Department'
];

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
  if (!allStaff || !Array.isArray(allStaff) || !searchQuery) {
    return [];
  }

  const query = searchQuery.toLowerCase().trim();
  if (!query) {
    return [];
  }

  const suggestions = new Set<string>();

  const addIfValid = (value: string | undefined | null) => {
    if (typeof value === 'string' && value.trim()) {
      const trimmed = value.trim();
      if (trimmed.toLowerCase().includes(query)) {
        suggestions.add(trimmed);
      }
    }
  };

  // Add department suggestions if they match the query
  DEPARTMENTS.forEach(dept => {
    if (dept.toLowerCase().includes(query)) {
      suggestions.add(dept);
    }
  });

  allStaff.forEach(member => {
    if (!member) return;

    addIfValid(member.name);
    addIfValid(member.mobile);

    if (isMandalStaff(member)) {
      addIfValid(member.position);
      addIfValid(member.department);
    }

    if (isSachivalayamStaff(member)) {
      addIfValid(member.designation);
      addIfValid(member.secretariat_name);
      addIfValid(member.secretariat_code);
    }

    if (isElectedRepresentative(member)) {
      addIfValid(member.position);
      addIfValid(member.representative_type);
      addIfValid(member.gram_panchayat);
      addIfValid(member.panchayat_name);
    }
  });

  return Array.from(suggestions).slice(0, 10);
};

export const filterStaff = (staff: StaffMember[] | null | undefined, searchQuery: string): StaffMember[] => {
  if (!staff || !Array.isArray(staff)) return [];
  if (!searchQuery?.trim()) return staff;

  const query = searchQuery.toLowerCase().trim();
  
  return staff.filter(member => {
    if (!member) return false;

    const searchableFields = [
      member.name,
      member.mobile,
      isMandalStaff(member) && member.position,
      isMandalStaff(member) && member.department,
      isSachivalayamStaff(member) && member.designation,
      isSachivalayamStaff(member) && member.secretariat_name,
      isSachivalayamStaff(member) && member.secretariat_code,
      isElectedRepresentative(member) && member.position,
      isElectedRepresentative(member) && member.representative_type,
      isElectedRepresentative(member) && member.gram_panchayat,
      isElectedRepresentative(member) && member.panchayat_name
    ].filter(Boolean);

    return searchableFields.some(field => 
      field?.toString().toLowerCase().includes(query)
    );
  });
};