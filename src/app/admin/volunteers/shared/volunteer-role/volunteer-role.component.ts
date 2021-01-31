import { Component, Input } from '@angular/core';
import { VolunteerRole } from '@volunteers/shared/volunteer-role';

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
