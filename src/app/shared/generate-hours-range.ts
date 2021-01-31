export function generateHoursRange(
  from: number,
  to: number,
): Array<{ label: string; value: number }> {
  const hours = [];

  for (let i = from; i <= to; i++) {
    const hour = i.toString(10).padStart(2, '0');
    hours.push({
      label: `${hour}:00`,
      value: i,
    });
  }

  return hours;
}
