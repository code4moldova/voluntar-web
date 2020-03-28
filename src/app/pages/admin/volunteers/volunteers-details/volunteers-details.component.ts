import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-volunteers-details',
  templateUrl: './volunteers-details.component.html',
  styleUrls: ['./volunteers-details.component.scss']
})
export class VolunteersDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  componentDestroyed$ = new Subject();
  volunteer$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) => this.volunteerFacade.volunteers$.pipe(
      // tap((volunteers) => !volunteers.length && this.volunteerFacade.getVolunteers()),
      map(volunteeers => volunteeers.find(v => v.id === +params.get('id'))),
    )),
    takeUntil(this.componentDestroyed$)
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private volunteerFacade: VolunteersFacadeService
  ) {
    this.form = this.fb.group({
      id: [null],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      gender: ['male', Validators.required],
      // address: [null, Validators.required],
      status: [false, Validators.required],
      // zone: [null, Validators.required],
      // date: [null, Validators.required], // Im not sure if it needs to be here
      social_profile: [null, Validators.required],
      age: [null, Validators.required],
      available_hours: [null, Validators.required],
      activity_type: [null, Validators.required], // Not sure what's this
    });
  }

  ngOnInit(): void {
    this.volunteer$.subscribe(volunteer => {
      if (volunteer) {
        this.form.setValue(volunteer);
      }
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.volunteerFacade.saveVolunteer(this.form.value);
    }
  }

}
