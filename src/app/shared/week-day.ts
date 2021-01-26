/**
 * Do not change the order of days, somewhere is dependent on Date.getDay()
 */
export enum WeekDay {
  sunday = 'sunday',
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
}

export const weekDays = Object.values(WeekDay);
