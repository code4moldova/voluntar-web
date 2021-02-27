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

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export const zonesCoordinates: Record<Zone, Coordinate> = {
  [Zone.centru]: {
    latitude: 47.01820503506154,
    longitude: 28.812844986831664,
  },

  [Zone.telecentru]: {
    latitude: 47.01820503506,
    longitude: 28.812844986831,
  },

  [Zone.botanica]: {
    latitude: 46.98634237915792,
    longitude: 28.85737532521311,
  },

  [Zone.buiucani]: {
    latitude: 47.027011033109694,
    longitude: 28.792694802549562,
  },

  [Zone.ciocana]: {
    latitude: 47.040753754886865,
    longitude: 28.833281219747807,
  },

  [Zone.riscani]: {
    latitude: 47.04642715050063,
    longitude: 28.89065903499436,
  },

  [Zone.suburbii]: {
    latitude: 47.024758255143986,
    longitude: 28.83263462925968,
  },
};
