// Telecentru added, add every zone map coordonates to center if it will be selected on filter in the map component.
export const KIV_ZONES = [
  {
    label: 'Toate',
    value: 'toate',
    mapCoordonates: {
      latitude: 47.024758255143986,
      longitude: 28.83263462925968,
    },
  },
  {
    label: 'Centru',
    value: 'centru',
    mapCoordonates: {
      latitude: 47.01820503506154,
      longitude: 28.812844986831664,
    },
  },
  {
    label: 'Telecentru',
    value: 'telecentru',
    mapCoordonates: {
      latitude: 47.01820503506,
      longitude: 28.812844986831,
    },
  },
  {
    label: 'Botanica',
    value: 'botanica',
    mapCoordonates: {
      latitude: 46.98634237915792,
      longitude: 28.85737532521311,
    },
  },
  {
    label: 'Buiucani',
    value: 'buiucani',
    mapCoordonates: {
      latitude: 47.027011033109694,
      longitude: 28.792694802549562,
    },
  },
  {
    label: 'Ciocana',
    value: 'ciocana',
    mapCoordonates: {
      latitude: 47.040753754886865,
      longitude: 28.833281219747807,
    },
  },
  {
    label: 'Rîșcani',
    value: 'riscani',
    mapCoordonates: {
      latitude: 47.04642715050063,
      longitude: 28.89065903499436,
    },
  },
  {
    label: 'Suburbii',
    value: 'suburbii',
    mapCoordonates: {
      latitude: 47.024758255143986,
      longitude: 28.83263462925968,
    },
  },
];

export const KIV_ZONES_MAP = KIV_ZONES.reduce((acc, zone) => {
  acc[zone.value] = zone.label;
  return acc;
}, {});

export enum VOLUNTEER_STATUS {}

// TODO: rename to VolunteerRole
export enum VOLUNTEER_ROLES {
  delivery = 'delivery',
  copilot = 'copilot',
  packing = 'packing',
  supply = 'supply',
  operator = 'operator',
}

export const volunteerRoles = Object.values(VOLUNTEER_ROLES);

// TODO: rename to Zone
export enum ZONES {
  botanica = 'botanica',
  buiucani = 'buiucani',
  centru = 'centru',
  ciocana = 'ciocana',
  riscani = 'riscani',
  telecentru = 'telecentru',
  suburbii = 'suburbii',
}

export const zones = Object.values(ZONES);

export const SPECIAL_CONDITIONS = [
  {
    label: 'Disability',
    value: 'disability',
  },
  {
    label: 'Deaf-mute',
    value: 'deafmute',
  },
  {
    label: 'Blind/Weak-seer',
    value: 'blind_weak_seer',
  },
];

export const SPECIAL_CONDITIONS_MAP = SPECIAL_CONDITIONS.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});
