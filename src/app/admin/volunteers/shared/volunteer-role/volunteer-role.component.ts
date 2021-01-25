import { Component, Input } from '@angular/core';
import { VolunteerRole } from '@shared/constants';

@Component({
  selector: 'app-volunteer-role',
  templateUrl: './volunteer-role.component.html',
})
export class VolunteerRoleComponent {
  @Input()
  role: VolunteerRole;
  @Input()
  showLabel = true;
}
