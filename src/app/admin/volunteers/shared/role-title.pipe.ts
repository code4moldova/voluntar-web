import { Pipe, PipeTransform } from '@angular/core';
import { VOLUNTEER_ROLES_MAP } from '@shared/constants';

@Pipe({
  name: 'roleTitle',
})
export class RoleTitlePipe implements PipeTransform {
  transform(value: string): string | null {
    return VOLUNTEER_ROLES_MAP[value];
  }
}
