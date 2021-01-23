import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent {
  @Input()
  role: string;
  @Input()
  showLabel = true;
}
