/**
 * Do not change the order of days, somewhere is dependent on Date.getDay()
 */
export enum WeekDay {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

/**
 * We create the array manually because we can't rely on {@link ObjectConstructor.values} order
 */
export const weekDays = [
  WeekDay.monday,
  WeekDay.tuesday,
  WeekDay.wednesday,
  WeekDay.thursday,
  WeekDay.friday,
  WeekDay.saturday,
  WeekDay.sunday,
];

/**
 * In some places we use {@link DateConstructor.getDay} that assumes that Sunday is first
 * The getDay() method returns the day of the week for the specified date according to local time, where 0 represents Sunday.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
 */
export const weekDaysSundayFirst = [
  WeekDay.sunday,
  ...weekDays.filter((wd) => wd !== WeekDay.sunday),
];
