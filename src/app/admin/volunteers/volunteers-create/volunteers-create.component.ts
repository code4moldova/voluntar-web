import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { weekDays } from '@shared/week-day';
import { zones } from '@shared/constants';
import { VolunteersFacade } from '../volunteers.facade';
import { generateHoursRange } from '@shared/generate-hours-range';
import { volunteerRoles } from '@volunteers/shared/volunteer-role';

@Component({
  templateUrl: './volunteers-create.component.html',
  styleUrls: ['./volunteers-create.component.scss'],
})
export class VolunteersCreateComponent {
  hours = generateHoursRange(8, 20);
  volunteerRoles: string[] = volunteerRoles;
  weekDays: string[] = weekDays;
  zones: string[] = zones;

  rangeValidator: ValidatorFn = () => {
    if (!this.form) return null;
    const start = this.form.get('availability_hours_start').value;
    const end = this.form.get('availability_hours_end').value;
    return start !== null && end !== null && start < end
      ? null
      : { range: true };
  };

  form = this.fb.group({
    first_name: this.fb.control('', [Validators.required]),
    last_name: this.fb.control('', [Validators.required]),
    phone: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[^0]([0-9]){7}$/),
    ]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    zone: this.fb.control('', [Validators.required]),
    address: this.fb.control('', [Validators.required]),
    age: this.fb.control(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(50),
      Validators.pattern(/^([0-9]){2}$/),
    ]),
    facebook_profile: this.fb.control(''),
    role: this.fb.control([], [Validators.required]),
    availability_days: this.fb.control([], [Validators.required]),
    availability_hours_start: this.fb.control(null, [Validators.required]),
    availability_hours_end: this.fb.control(null, [
      Validators.required,
      this.rangeValidator,
    ]),
  });

  constructor(
    private volunteersService: VolunteersFacade,
    private fb: FormBuilder
  ) {}

  onSubmit(form: FormGroup) {
    if (form.invalid) return;

    this.volunteersService.saveVolunteer({
      ...this.form.value,
    });
  }
}
