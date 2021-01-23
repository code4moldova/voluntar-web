import { Pipe, PipeTransform } from '@angular/core';
import { IVolunteer } from '@app/shared/models/volunteers';
import { Beneficiary } from '../models/beneficiary';

@Pipe({
  name: 'filterByNameOrFamily',
})
export class FilterByNameOrFamilyPipe implements PipeTransform {
  transform(
    arrayOfPersons: Array<IVolunteer | Beneficiary>,
    stringToFilter: string
  ): any[] {
    return arrayOfPersons.filter(
      (person) =>
        person.first_name
          .toLowerCase()
          .includes(stringToFilter.toLowerCase()) ||
        person.last_name.toLowerCase().includes(stringToFilter.toLowerCase())
    );
  }
}
