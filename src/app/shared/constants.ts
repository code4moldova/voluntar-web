export enum Zone {
  botanica = 'botanica',
  buiucani = 'buiucani',
  centru = 'centru',
  ciocana = 'ciocana',
  riscani = 'riscani',
  telecentru = 'telecentru',
  suburbii = 'suburbii',
}

export const zones = Object.values(Zone);

/**
 * TODO: refactor to use normal l10n
 *
 * @deprecated use {@link Zone} instead
 */
export const KIV_ZONES = [
  {
    // Backend does not have such a zone, do not use it in REST communication
    label: 'Toate',
    value: 'toate',
    mapCoordinates: {
      latitude: 47.024758255143986,
      longitude: 28.83263462925968,
    },
  },
  {
    label: 'Centru',
    value: Zone.centru,
    mapCoordinates: {
      latitude: 47.01820503506154,
      longitude: 28.812844986831664,
    },
  },
  {
    label: 'Telecentru',
    value: Zone.telecentru,
    mapCoordinates: {
      latitude: 47.01820503506,
      longitude: 28.812844986831,
    },
  },
  {
    label: 'Botanica',
    value: Zone.botanica,
    mapCoordinates: {
      latitude: 46.98634237915792,
      longitude: 28.85737532521311,
    },
  },
  {
    label: 'Buiucani',
    value: Zone.buiucani,
    mapCoordinates: {
      latitude: 47.027011033109694,
      longitude: 28.792694802549562,
    },
  },
  {
    label: 'Ciocana',
    value: Zone.ciocana,
    mapCoordinates: {
      latitude: 47.040753754886865,
      longitude: 28.833281219747807,
    },
  },
  {
    label: 'Rîșcani',
    value: Zone.riscani,
    mapCoordinates: {
      latitude: 47.04642715050063,
      longitude: 28.89065903499436,
    },
  },
  {
    label: 'Suburbii',
    value: Zone.suburbii,
    mapCoordinates: {
      latitude: 47.024758255143986,
      longitude: 28.83263462925968,
    },
  },
];

// TODO: Move in volunteers/shared
export enum VolunteerRole {
  delivery = 'delivery',
  copilot = 'copilot',
  packing = 'packing',
  supply = 'supply',
  operator = 'operator',
}

// TODO: Move in volunteers/shared
export const volunteerRoles = Object.values(VolunteerRole);

export enum SpecialCondition {
  disability = 'disability',
  deaf_mute = 'deaf_mute',
  blind_weak_seer = 'blind_weak_seer',
}

export const specialConditions = Object.values(SpecialCondition);
