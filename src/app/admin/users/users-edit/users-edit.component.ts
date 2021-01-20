import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole, userRoles } from '@users/shared/user-role';
import { weekDays } from '@shared/week-day';
import { generateHoursRange } from '@shared/generate-hours-range';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '@users/shared/user';
import { UsersService } from '@users/users.service';

@Component({
  templateUrl: './users-edit.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UsersEditComponent implements OnDestroy {
  private _destroy = new Subject<void>();

  weekDays = weekDays;
  hours = generateHoursRange(8, 20);
  roles = userRoles.filter(
    // Filter deprecated roles
    (role) => ![UserRole.fixer, UserRole.admin].includes(role)
  );

  formGroup = this.fb.group({
    _id: this.fb.control(''),
    is_active: this.fb.control(null),
    first_name: this.fb.control('', Validators.required),
    last_name: this.fb.control('', Validators.required),
    phone: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[^0]([0-9]){7}$/),
    ]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.minLength(6)),
    role: this.fb.control(null, Validators.required),
    availability_days: this.fb.control([], Validators.required),
    availability_hours_start: this.fb.control(null, Validators.required),
    availability_hours_end: this.fb.control(null, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    route.data.pipe(takeUntil(this._destroy)).subscribe((data) => {
      const resolvedUser: User = data.user;
      this.formGroup.patchValue({
        ...resolvedUser,
        role: resolvedUser.roles[0],
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  onSubmit(formGroup: FormGroup) {
    if (formGroup.invalid) return;

    this.usersService
      .update({
        ...formGroup.value,
        // Backend receives an array of roles
        role: undefined,
        roles: [formGroup.value.role],
        // Remove password totally if is empty
        // Otherwise it will try to change it
        password: formGroup.value.password
          ? formGroup.value.password
          : undefined,
      })
      .pipe(takeUntil(this._destroy))
      .subscribe();
  }
}
