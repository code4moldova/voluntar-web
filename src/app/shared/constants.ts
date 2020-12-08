export const KIV_ZONES = [
  {
    label: 'Centru',
    value: 'centru',
  },
  {
    label: 'Botanica',
    value: 'botanica',
  },
  {
    label: 'Buiucani',
    value: 'buiucani',
  },
  {
    label: 'Ciocana',
    value: 'ciocana',
  },
  {
    label: 'Rîșcani',
    value: 'riscani',
  },
];

export const KIV_ZONES_MAP = KIV_ZONES.reduce((acc, zone) => {
  acc[zone.value] = zone.label;
  return acc;
}, {});

export enum VOLUNTEER_ROLES {
  delivery = 'delivery',
  copilot = 'copilot',
  packing = 'packing',
  supply = 'supply',
  operator = 'operator',
}

export enum VOLUNTEER_ROLES_ICONS {
  delivery = 'transport',
  copilot = 'copilot',
  packing = 'impachetare',
  supply = 'aprovizionare',
  operator = 'operator',
}

export const SPECIAL_CONDITIONS = [
  {
    label: 'Disability',
    value: 'disability',
  },
  {
    label: 'Deaf-mute',
    value: 'deaf_mute',
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
