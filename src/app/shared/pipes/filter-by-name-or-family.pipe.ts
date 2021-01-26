import { Pipe, PipeTransform } from '@angular/core';
import { IVolunteer } from '@app/shared/models/volunteers';
import { Beneficiary } from '@shared/models';

@Pipe({
  name: 'filterByNameOrFamily',
})
export class FilterByNameOrFamilyPipe implements PipeTransform {
  transform(
    arrayOfPersons: Array<IVolunteer | Beneficiary>,
    stringToFilter: string
  ): (IVolunteer | Beneficiary)[] {
    return arrayOfPersons.filter(
      (person) =>
        person.first_name
          .toLowerCase()
          .includes(stringToFilter.toLowerCase()) ||
        person.last_name.toLowerCase().includes(stringToFilter.toLowerCase())
    );
  }
}
