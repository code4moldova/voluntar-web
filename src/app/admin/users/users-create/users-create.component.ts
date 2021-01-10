import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { weekDays } from '@shared/week-day';
import { UserRole, userRoles } from '@users/shared/user-role';
import { generateHoursRange } from '@shared/generate-hours-range';
import { UsersFacade } from '@users/users.facade';

@Component({
  templateUrl: './users-create.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UsersCreateComponent {
  roles = userRoles.filter(
    // Filter deprecated roles
    (role) => ![UserRole.fixer, UserRole.admin].includes(role)
  );
  weekDays = weekDays;
  hours = generateHoursRange(8, 20);

  samePasswordValidator: ValidatorFn = (control: AbstractControl) => {
    const password = this.formGroup?.get('password');
    const valueMatches = password?.value === control.value;
    const someFieldIsDisabled = password?.disabled || control.disabled;
    return someFieldIsDisabled || valueMatches
      ? null
      : {
          passwordsDoNotMatch: !valueMatches,
        };
  };

  formGroup = this.fb.group({
    first_name: this.fb.control('', Validators.required),
    last_name: this.fb.control('', Validators.required),
    phone: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[^0]([0-9]){7}$/),
    ]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repeatPassword: this.fb.control('', [
      Validators.required,
      this.samePasswordValidator,
    ]),
    role: this.fb.control(undefined, Validators.required),
    availability_days: this.fb.control([], Validators.required),
    availability_hours_start: this.fb.control(undefined, Validators.required),
    availability_hours_end: this.fb.control(undefined, Validators.required),
  });

  constructor(private fb: FormBuilder, private usersFacade: UsersFacade) {}

  onSubmit(formGroup: FormGroup) {
    if (formGroup.invalid) return;

    this.usersFacade.saveUser({
      ...formGroup.value,
      // Backend receives an array of roles
      role: undefined,
      roles: [formGroup.value.role],
      // Backend receives only password field
      repeatPassword: undefined,
    });
  }
}
