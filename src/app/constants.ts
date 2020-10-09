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
