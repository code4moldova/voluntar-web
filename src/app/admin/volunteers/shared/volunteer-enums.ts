export enum VolunteerRole {
  delivery = 'delivery',
  copilot = 'copilot',
  packing = 'packing',
  supply = 'supply',
  operator = 'operator',
}

export const volunteerRoles = Object.values(VolunteerRole);

export enum VolunteerStatus {
  active = 'active',
  inactive = 'inactive',
  blacklist = 'blacklist',
}

export const volunteerStatuses = Object.values(VolunteerStatus);
