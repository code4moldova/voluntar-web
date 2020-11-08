import { Pipe, PipeTransform } from '@angular/core';
import { SPECIAL_CONDITIONS_MAP } from '@shared/constants';

@Pipe({ name: 'specialConditionTitle' })
export class SpecialConditionTitlePipe implements PipeTransform {
  transform(value: string): string | null {
    return SPECIAL_CONDITIONS_MAP[value];
  }
}
