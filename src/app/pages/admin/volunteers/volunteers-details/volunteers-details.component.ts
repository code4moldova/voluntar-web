import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';

@Component({
  selector: 'app-volunteers-details',
  templateUrl: './volunteers-details.component.html',
  styleUrls: ['./volunteers-details.component.scss']
})
export class VolunteersDetailsComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private volunteerFacade: VolunteersFacadeService) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
      active: [false, Validators.required],
      zone: [null, Validators.required],
      // date: [null, Validators.required], // Im not sure if it needs to be here
      fbProfile: [null, Validators.required],
      age: [null, Validators.required],
      hoursPerDay: [null, Validators.required],
      activitiesType: [null, Validators.required], // Not sure what's this
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.volunteerFacade.createNewVolunteer(this.form.value);
    }
  }

}
