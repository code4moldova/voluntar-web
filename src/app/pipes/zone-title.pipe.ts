import { Pipe, PipeTransform } from '@angular/core';
import { KIV_ZONES_MAP } from '../constants';

@Pipe({ name: 'zoneTitle' })
export class ZoneTitlePipe implements PipeTransform {
  transform(value: string): string | null {
    return KIV_ZONES_MAP[value];
  }
}
