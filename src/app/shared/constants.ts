import { Zone } from '@shared/zone';

/**
 * TODO: refactor to use normal l10n
 *
 * @deprecated use {@link Zone} instead
 */
export const KIV_ZONES = [
  {
    label: 'Centru',
    value: Zone.centru,
  },
  {
    label: 'Telecentru',
    value: Zone.telecentru,
  },
  {
    label: 'Botanica',
    value: Zone.botanica,
  },
  {
    label: 'Buiucani',
    value: Zone.buiucani,
  },
  {
    label: 'Ciocana',
    value: Zone.ciocana,
  },
  {
    label: 'Rîșcani',
    value: Zone.riscani,
  },
  {
    label: 'Suburbii',
    value: Zone.suburbii,
  },
];

export enum SpecialCondition {
  disability = 'disability',
  deaf_mute = 'deaf_mute',
  blind_weak_seer = 'blind_weak_seer',
}

export const specialConditions = Object.values(SpecialCondition);
