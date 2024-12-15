export interface BaseStaffMember {
  id: string;
  name: string;
  mobile?: string;
  created_at: string;
  updated_at: string;
}

export interface MandalStaff extends BaseStaffMember {
  position: string;
  department?: string;
  staff_type: 'mandal_office' | 'mandal_officer';
  is_working?: boolean;
}

export interface SachivalayamStaff extends BaseStaffMember {
  secretariat_name: string;
  secretariat_code?: string;
  designation: string;
  cfms?: string;
}

export interface ElectedRepresentative extends BaseStaffMember {
  position: string;
  representative_type: 'MPP' | 'ZPTC' | 'Sarpanch' | 'MPTC';
  gram_panchayat?: string;
  panchayat_name?: string;
}

export type StaffMember = MandalStaff | SachivalayamStaff | ElectedRepresentative;