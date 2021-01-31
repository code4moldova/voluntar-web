import { Pipe, PipeTransform } from '@angular/core';
import { Beneficiary } from '@shared/models';
import { Volunteer } from '@volunteers/shared/volunteer';

@Pipe({
  name: 'filterByNameOrFamily',
})
export class FilterByNameOrFamilyPipe implements PipeTransform {
  transform(
    arrayOfPersons: Array<Volunteer | Beneficiary>,
    stringToFilter: string,
  ): (Volunteer | Beneficiary)[] {
    return arrayOfPersons.filter(
      (person) =>
        person.first_name
          .toLowerCase()
          .includes(stringToFilter.toLowerCase()) ||
        person.last_name.toLowerCase().includes(stringToFilter.toLowerCase()),
    );
  }
}
