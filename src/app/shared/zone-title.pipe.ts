import { Pipe, PipeTransform } from '@angular/core';
import { KIV_ZONES_MAP } from '@shared/constants';

/** @deprecated use `translate` pipe instead */
@Pipe({ name: 'zoneTitle' })
export class ZoneTitlePipe implements PipeTransform {
  transform(value: string): string | null {
    return KIV_ZONES_MAP[value];
  }
}
