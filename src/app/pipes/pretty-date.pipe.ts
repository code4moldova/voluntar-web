import { Pipe, PipeTransform } from '@angular/core';

const RO_MONTHS = [
  'ian',
  'feb',
  'mar',
  'apr',
  'mai',
  'iun',
  'iul',
  'aug',
  'sep',
  'noi',
  'dec',
];

@Pipe({
  name: 'prettyDate',
})
export class PrettyDatePipe implements PipeTransform {
  transform(value: string | Date, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'astăzi';
    }

    let result = `${date.getDate().toString()} ${RO_MONTHS[date.getMonth()]}`;
    if (date.getFullYear() !== today.getFullYear()) {
      result += ` ${date.getFullYear()}`;
    }

    return result;
  }
}
